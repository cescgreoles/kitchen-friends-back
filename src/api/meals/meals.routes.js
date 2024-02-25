const express = require("express");
const Meal = require("./meals.model");
const router = express.Router();
const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { deleteFile } = require("../../middlewares/deleteFile");

router.get("/", async (req, res, next) => {
  try {
    const allMeals = await Meal.find().populate("ingredients");
    return res.status(200).json(allMeals);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const mealToFind = await Meal.findById(id).populate("ingredients");
    return res.status(200).json(mealToFind);
  } catch (error) {
    return next(error);
  }
});

router.get("/meals/:id", async (req, res, next) => {
  try {
    const mealId = req.params.id;
    const meal = await Meal.findById(mealId).populate("ingredients");
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    return res.status(200).json(meal);
  } catch (error) {
    return next(error);
  }
});

router.get("/getbyname/:name", async (req, res, next) => {
  try {
    const name = req.params.name;
    const mealToFind = await Meal.findOne({ name: name }).populate(
      "ingredients"
    );
    return res.status(200).json(mealToFind);
  } catch (error) {
    return next(error);
  }
});

router.post("/create", upload.single("img"), async (req, res, next) => {
  try {
    const meal = req.body;
    if (req.file) {
      meal.img = req.file.path;
    }
    const newMeal = new Meal(meal);
    const created = await newMeal.save();
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
});

router.put("/edit/:id", upload.single("img"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const mealData = req.body;
    console.log(JSON.stringify(mealData));
    const mealOld = await Meal.findById(id).populate("ingredients");
    const mealModify = { ...mealOld._doc, ...mealData };
    if (req.file) {
      if (mealOld.img) {
        deleteFile(mealOld.img);
      }
      mealModify.img = req.file.path;
    }

    const mealUpdated = await Meal.findByIdAndUpdate(id, mealModify);
    return res.status(200).json({
      message: "Receta editada con éxito",
      mealModified: mealUpdated,
    });
  } catch (error) {
    return next(error);
  }
});

// Ruta para eliminar una receta
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const meal = await Meal.findById(id);
    if (meal.img) {
      deleteFile(meal.img);
    }
    await Meal.findByIdAndDelete(id);
    return res.status(200).json({ message: "Receta eliminada con éxito" });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

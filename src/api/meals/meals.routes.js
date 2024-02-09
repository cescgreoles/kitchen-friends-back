const express = require("express");
const Meal = require("./meals.model");
const router = express.Router();
const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { deleteFile } = require("../../middlewares/deleteFile");

router.get("/", async (req, res, next) => {
  try {
    const allMeals = await Meal.find();
    return res.status(200).json(allMeals);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const mealToFind = await Meal.findById(id);
    return res.status(200).json(mealToFind);
  } catch (error) {
    return next(error);
  }
});

router.get("/getbyname/:name", async (req, res, next) => {
  try {
    const name = req.params.name;
    const mealToFind = await Meal.findOne({ name: name });
    return res.status(200).json(mealToFind);
  } catch (error) {
    return next(error);
  }
});

router.post(
  "/create",

  upload.single("img"),
  async (req, res, next) => {
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
  }
);

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const meal = await Meal.findById(id);
    if (meal.img) {
      deleteFile(meal.img);
    }
    const mealToDelete = await Meal.findByIdAndDelete(id);
    return res
      .status(200)
      .json(`Se ha conseguido borrar la comida ${mealToDelete.name}`);
  } catch (error) {
    return next(error);
  }
});

router.put("/edit/:id", upload.single("img"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const meal = req.body;
    const mealOld = await Meal.findById(id);
    const mealModify = new Meal(meal);
    if (req.file) {
      if (mealOld.img) {
        deleteFile(mealOld.img);
      }
      mealModify.img = req.file.path;
    }
    mealModify._id = id;
    const mealUpdated = await Meal.findByIdAndUpdate(id, mealModify);
    return res.status(200).json({
      mensaje: "Se ha conseguido editar la receta",
      mealModificado: mealUpdated,
    });
  } catch (error) {
    return next(error);
  }
});

// Ruta para agregar un nuevo tipo de comida a una comida existente
router.post("/meals/:mealId/types", async (req, res) => {
  try {
    const { name, description } = req.body;
    const meal = await Meal.findById(req.params.mealId);
    if (!meal) {
      return res.status(404).json({ message: "Comida no encontrada" });
    }
    meal.type = { name, description };
    const updatedMeal = await meal.save();
    res.status(201).json(updatedMeal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para agregar un nuevo ingrediente a una comida existente
router.post("/meals/:mealId/ingredients", async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const meal = await Meal.findById(req.params.mealId);
    if (!meal) {
      return res.status(404).json({ message: "Comida no encontrada" });
    }
    const newIngredient = { name, quantity };
    meal.ingredients.push(newIngredient);
    const updatedMeal = await meal.save();
    res.status(201).json(updatedMeal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

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
  [isAdmin],
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

router.delete("/delete/:id", [isAdmin], async (req, res, next) => {
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

router.put(
  "/edit/:id",
  [isAdmin],
  upload.single("img"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const meal = req.body;
      const mealOld = await Meal.findById(id);
      const mealModify = new Center(meal);
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
  }
);

module.exports = router;

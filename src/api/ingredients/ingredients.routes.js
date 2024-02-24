const express = require("express");
const Ingredient = require("./ingredients.model");
const router = express.Router();
const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { deleteFile } = require("../../middlewares/deleteFile");

router.get("/", async (req, res, next) => {
  try {
    const allIngredients = await Ingredient.find();
    return res.status(200).json(allIngredients);
  } catch (error) {
    return next(error);
  }
});

router.post("/create", upload.single("img"), async (req, res, next) => {
  try {
    const ingredient = req.body;
    const newIngredient = new Ingredient(ingredient);
    const created = await newIngredient.save();
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const ingredient = await Ingredient.findById(id);
    await Ingredient.findByIdAndDelete(id);
    return res.status(200).json({ message: "Ingrediente eliminado con éxito" });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

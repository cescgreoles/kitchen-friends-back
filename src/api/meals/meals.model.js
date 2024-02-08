const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const typeSchema = new mongoose.Schema({
  name: { type: String },
  // Otros campos para describir un tipo de comida
});

// Esquema para los ingredientes
const ingredientSchema = new mongoose.Schema({
  name: { type: String },
  // Otros campos para describir un ingrediente
});

const mealsShema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    type: [typeSchema],
    description: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    duration: { type: Number, required: true },
    ingredients: [ingredientSchema],
  },

  {
    timestamps: true,
  }
);

const Meal = mongoose.model("meals", mealsShema);

module.exports = Meal;

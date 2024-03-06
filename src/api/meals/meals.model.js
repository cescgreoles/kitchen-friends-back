const mongoose = require("mongoose");
const Ingredient = require("../ingredients/ingredients.model");
const Apat = require("../apats/apats.model");
const Tipo = require("../tipos/tipos.model");
const Schema = mongoose.Schema;

const mealsSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    tipo: [{ type: Schema.Types.ObjectId, ref: "Tipo" }],
    description: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    apats: [{ type: Schema.Types.ObjectId, ref: "Apat" }],
    duration: { type: Number, required: true },
    ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
    cook: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Meal = mongoose.model("meals", mealsSchema);

module.exports = Meal;

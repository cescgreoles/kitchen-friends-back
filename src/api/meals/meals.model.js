const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mealsShema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    duration: { type: Number, required: true },
    ingredients: { type: String, required: true, trim: true },
    cook: { type: String, required: true },
  },

  {
    timestamps: true,
  }
);

const Meal = mongoose.model("meals", mealsShema);

module.exports = Meal;

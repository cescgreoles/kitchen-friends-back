const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
  name: { type: String, required: true, trim: true },
});

const Ingredient = mongoose.model("Ingredient", ingredientsSchema);

module.exports = Ingredient;

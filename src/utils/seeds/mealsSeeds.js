const mongoose = require("mongoose");
const Meal = require("../../api/meals/meals.model");
const Ingredient = require("../../api/ingredients/ingredients.model");
const { DB_URL } = require("../database/db");

const seedDatabase = async () => {
  try {
    const db = await mongoose.connect(DB_URL);

    // Delete all ingredients
    const allIngredients = await Ingredient.find().lean();
    if (allIngredients.length) {
      await Ingredient.collection.drop();
      console.log("Ingredients Deleted");
    }

    // Add new ingredients
    const ingredients = [
      { name: "carn" },
      { name: "bechamel" },
      { name: "pasta" },
    ];

    const newIngredients = await Ingredient.insertMany(ingredients);
    console.log("Ingredients Created");

    // Delete all meals
    const allMeals = await Meal.find().lean();
    if (allMeals.length) {
      await Meal.collection.drop();
      console.log("Meals Deleted");
    }

    const meals = [
      {
        name: "Macarrones",
        type: "pasta",
        description: "macarrones veganos con verduras del tiempo",
        img: "imagen-1",
        duration: 20,
        ingredients: newIngredients.map((ingredient) => ingredient._id),
        cook: "cesc",
      },
    ];
    await Meal.insertMany(meals);
    console.log("Meals Created");

    await db.disconnect();
  } catch (error) {
    console.log(error);
  }
};

seedDatabase();

const mealLog = "Comidas Listos!!";
module.exports = mealLog;

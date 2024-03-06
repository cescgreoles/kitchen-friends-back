// const mongoose = require("mongoose");
// const Meal = require("../../api/meals/meals.model");
// const Ingredient = require("../../api/ingredients/ingredients.model");
// const { DB_URL } = require("../database/db");

// const seedDatabase = async () => {
//   try {
//     const db = await mongoose.connect(DB_URL);

//     // Delete all ingredients
//     const allIngredients = await Ingredient.find().lean();
//     if (allIngredients.length) {
//       await Ingredient.collection.drop();
//       console.log("Ingredients Deleted");
//     }

//     // Add new ingredients
//     const ingredients = [
//       { name: "carn" },
//       { name: "bechamel" },
//       { name: "pasta" },
//     ];

//     const newIngredients = await Ingredient.insertMany(ingredients);
//     console.log("Ingredients Created");

//     // Delete all meals
//     const allMeals = await Meal.find().lean();
//     if (allMeals.length) {
//       await Meal.collection.drop();
//       console.log("Meals Deleted");
//     }

//     const meals = [
//       {
//         name: "Macarrones",
//         type: "pasta",
//         description: "macarrones veganos con verduras del tiempo",
//         img: "imagen-1",
//         duration: 20,
//         ingredients: newIngredients.map((ingredient) => ingredient._id),
//         cook: "cesc",
//       },
//     ];
//     await Meal.insertMany(meals);
//     console.log("Meals Created");

//     await db.disconnect();
//   } catch (error) {
//     console.log(error);
//   }
// };

// seedDatabase();

// const mealLog = "Comidas Listos!!";
// module.exports = mealLog;

const mongoose = require("mongoose");
const Meal = require("../../api/meals/meals.model");
const Ingredient = require("../../api/ingredients/ingredients.model");
const Tipo = require("../../api/tipos/tipos.model"); // Importa el modelo de tipos
const Apat = require("../../api/apats/apats.model"); // Importa el modelo de apats
const { DB_URL } = require("../database/db");

const seedDatabase = async () => {
  try {
    const db = await mongoose.connect(DB_URL);

    // Eliminar todos los ingredientes
    const allIngredients = await Ingredient.find().lean();
    if (allIngredients.length) {
      await Ingredient.collection.drop();
      console.log("Ingredients Deleted");
    }

    // Agregar nuevos ingredientes
    const ingredients = [
      { name: "carn" },
      { name: "bechamel" },
      { name: "pasta" },
    ];
    const newIngredients = await Ingredient.insertMany(ingredients);
    console.log("Ingredients Created");

    // Eliminar todos los ingredientes
    const allApats = await Apat.find().lean();
    if (allApats.length) {
      await Apat.collection.drop();
      console.log("Apats Deleted");
    }

    // Agregar nuevos ingredientes
    const apats = [
      { name: "Aperitivos" },
      { name: "Desayunos" },
      { name: "Comidas" },
      { name: "Cenas" },
    ];
    const newApats = await Apat.insertMany(apats);
    console.log("Apats Created");

    // Eliminar todos los ingredientes
    const allTipos = await Tipo.find().lean();
    if (allTipos.length) {
      await Tipo.collection.drop();
      console.log("Tipos Deleted");
    }

    // Agregar nuevos ingredientes
    const tipos = [
      { name: "Carne" },
      { name: "Pasta" },
      { name: "Arroz" },
      { name: "Vegano" },
      { name: "Vegetariano" },
      { name: "Japonés" },
      { name: "Italiano" },
      { name: "Internacional" },
    ];
    const newTipos = await Tipo.insertMany(tipos);
    console.log("Tipos Created");

    // Eliminar todas las comidas
    const allMeals = await Meal.find().lean();
    if (allMeals.length) {
      await Meal.collection.drop();
      console.log("Meals Deleted");
    }

    // Agregar nuevas comidas
    const meals = [
      {
        name: "Macarrones",
        tipo: newTipos.map((tipo) => tipo._id),
        description: "macarrones veganos con verduras del tiempo",
        img: "imagen-1",
        duration: 20,
        apats: newApats.map((apat) => apat._id),
        ingredients: newIngredients.map((ingredient) => ingredient._id),
        cook: "cesc",
      },
    ];

    await Meal.insertMany(meals);
    console.log("Meals Created");

    // Resto del código para tipos y apats

    await db.disconnect();
  } catch (error) {
    console.log(error);
  }
};

seedDatabase();

const mealLog = "Colecciones Creadas!!";
module.exports = mealLog;

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
      { name: "Aceite de oliva" },
      { name: "Aceite vegetal" },
      { name: "Aceitunas" },
      { name: "Agua" },
      { name: "Ajo" },
      { name: "Albaricoque" },
      { name: "Alcachofas" },
      { name: "Almendras" },
      { name: "Apio" },
      { name: "Arroz" },
      { name: "Arándanos" },
      { name: "Azúcar" },
      { name: "Azúcar glas" },
      { name: "Azúcar moreno" },
      { name: "Batatas" },
      { name: "Batidos" },
      { name: "Bebidas" },
      { name: "Bebidas alcohólicas" },
      { name: "Berros" },
      { name: "Bebidas" },
      { name: "Bebidas alcohólicas" },
      { name: "Brócoli" },
      { name: "Cacao en polvo" },
      { name: "Café" },
      { name: "Calabacines" },
      { name: "Calabaza" },
      { name: "Caldos" },
      { name: "Camarones" },
      { name: "Canela" },
      { name: "Carne de res" },
      { name: "Carnes" },
      { name: "Cebolla" },
      { name: "Cerezas" },
      { name: "Cerdo" },
      { name: "Cereales" },
      { name: "Cereales integrales" },
      { name: "Champiñones" },
      { name: "Chocolate" },
      { name: "Chocolate blanco" },
      { name: "Chocolate con leche" },
      { name: "Chocolate negro" },
      { name: "Ciruela" },
      { name: "Coco" },
      { name: "Coliflor" },
      { name: "Condimentos" },
      { name: "Conservas" },
      { name: "Crema" },
      { name: "Cócteles" },
      { name: "Dátiles" },
      { name: "Encurtidos" },
      { name: "Escarola" },
      { name: "Especias" },
      { name: "Espárragos" },
      { name: "Espinacas" },
      { name: "Especias" },
      { name: "Frambuesas" },
      { name: "Frutas" },
      { name: "Frutas deshidratadas" },
      { name: "Frutas en conserva" },
      { name: "Frutas secas" },
      { name: "Frutas tropicales" },
      { name: "Frutos del bosque" },
      { name: "Frutos rojos" },
      { name: "Frutos secos" },
      { name: "Galletas" },
      { name: "Guisantes" },
      { name: "Harina" },
      { name: "Harina de maíz" },
      { name: "Harina de trigo" },
      { name: "Harina integral" },
      { name: "Hierbas aromáticas" },
      { name: "Hortalizas" },
      { name: "Huevos" },
      { name: "Infusiones" },
      { name: "Judías verdes" },
      { name: "Jarabe de arce" },
      { name: "Ketchup" },
      { name: "Kiwi" },
      { name: "Leche" },
      { name: "Lechuga" },
      { name: "Licores" },
      { name: "Limones" },
      { name: "Mango" },
      { name: "Manzanas" },
      { name: "Mantequilla" },
      { name: "Mayonesa" },
      { name: "Melocotón" },
      { name: "Melón" },
      { name: "Miel" },
      { name: "Mostaza" },
      { name: "Naranjas" },
      { name: "Nata" },
      { name: "Nueces" },
      { name: "Pasta" },
      { name: "Pasta" },
      { name: "Pepinos" },
      { name: "Pasas" },
      { name: "Pimientos" },
      { name: "Piña" },
      { name: "Pipas de girasol" },
      { name: "Pescado" },
      { name: "Plátanos" },
      { name: "Platos principales" },
      { name: "Pollo" },
      { name: "Postres" },
      { name: "Pimienta" },
      { name: "Puerros" },
      { name: "Pimientos" },
      { name: "Quinoa" },
      { name: "Queso" },
      { name: "Remolachas" },
      { name: "Rúcula" },
      { name: "Sal" },
      { name: "Salsa Alfredo" },
      { name: "Salsa de soja" },
      { name: "Salsa de tomate" },
      { name: "Salsa pesto" },
      { name: "Salsa teriyaki" },
      { name: "Salsa Worcestershire" },
      { name: "Sandía" },
      { name: "Sándwiches" },
      { name: "Sopas" },
      { name: "Snacks" },
      { name: "Stevia" },
      { name: "Té" },
      { name: "Tortillas" },
      { name: "Tomates" },
      { name: "Tofu" },
      { name: "Tomate" },
      { name: "Uvas" },
      { name: "Vegetales" },
      { name: "Vegetales en conserva" },
      { name: "Vinagre balsámico" },
      { name: "Vinagre de vino" },
      { name: "Vino" },
      { name: "Yogur" },
      { name: "Zanahorias" },
      { name: "Zumos" },
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

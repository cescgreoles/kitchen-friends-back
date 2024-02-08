const mongoose = require("mongoose");
const Meal = require("../../api/meals/meals.model");
const { DB_URL } = require("../database/db");

const meals = [
  {
    name: "Macarrones",
    type: [{ name: "vegano" }],
    description: "macarrones veganos con verduras del tiempo",
    img: "imagen-1",
    duration: 20,
    ingredients: [{ name: "Ingrediente 1" }, { name: "Ingrediente 2" }],
  },
];

mongoose
  .connect(DB_URL)
  .then(async () => {
    const allMeals = await Meal.find().lean();

    if (!allMeals.length) {
      console.log("[seed]: No se encuentran las comidas, continuo...");
    } else {
      console.log(`[seed]: Encontrados ${allMeals.length} comidas.`);
      await Meal.collection.drop();
      console.log("[seed]: Colección Comidas eliminada correctamente");
    }
  })
  .catch((error) =>
    console.log("[seed]: Error eliminando la colección -->", error)
  )
  .then(async () => {
    await Meal.insertMany(meals);
    console.log(
      `[seed]: ${meals.length} nuevas comidas añadidos con éxito nyaaaaaam`
    );
  })
  .catch((error) => console.log("[seed]: Error añadiendo los centros", error))
  .finally(() => mongoose.disconnect());

const mealLog = "Comidas Listos!!";

module.exports = mealLog;

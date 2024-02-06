const { mongoose } = require("mongoose");
const Meal = require("../../api/centers/centers.model");
const { DB_URL } = require("../database/db");

const meals = [
  {
    name: "Macarrones a la boloñesa",
    description: "con tomate son muy buenos",
    img: "",
    duration: "20 minutos",
    ingredients: "tomate, macarrones, huevo, queso",
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
    await Center.insertMany(meals);
    console.log(`[seed]: ${meals.length} nuevos centros añadidos con éxito`);
  })
  .catch((error) => console.log("[seed]: Error añadiendo los centros", error))
  .finally(() => mongoose.disconnect());

const mealLog = "Comidas Listos!!";

module.exports = mealLog;

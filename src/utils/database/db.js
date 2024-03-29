const mongoose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.DB_URL;

const connectDb = async () => {
  try {
    const db = await mongoose.connect(DB_URL);
    const { name, host } = db.connection;
    console.log(`Conectado con éxito a la db: ${name} en ${host}`);
  } catch (error) {
    console.log("Error conectando a la base de datos:", error);
  }
};

module.exports = {
  connectDb,
  DB_URL,
};

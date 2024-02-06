const express = require("express");
const indexRoutes = require("./src/api/index/index.routes.js");
const mealsRoutes = require("./src/api/meals/meals.routes");
const usersRoutes = require("./src/api/users/users.routes");
const cors = require("cors");
require("dotenv").config();
const db = require("./src/utils/database/db");
const cloudinary = require("cloudinary").v2;

db.connectDb();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const server = express();
const PORT = 3000;

server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

server.use(express.json({ limit: "5mb" }));
server.use(express.urlencoded({ extended: false }));
server.use("/", indexRoutes);
server.use("/meals", mealsRoutes);
server.use("/users", usersRoutes);

server.use("", (req, res) => {
  return res.status(404).json("Ruta no encontrada");
});

server.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "unexpected error");
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const express = require("express");
const User = require("./users.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt/jwt");
const { isAuth, isAdmin } = require("../../middlewares/auth");

router.get("/profile", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    res.status(500).send("Error del servidor");
  }
});
// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json("Error al leer los usuarios");
  }
});

// Registro de usuario
router.post("/create", async (req, res) => {
  try {
    const { name, email, password, code } = req.body;

    // Crear el nuevo usuario
    const newUser = new User({ name, email, password });

    if (newUser.rol === "user") {
      const created = await newUser.save();
      return res.status(201).json(created);
    } else {
      return res
        .status(400)
        .json({ message: "No puedes crear una cuenta de administrador" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
});

// Inicio de sesión de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(404).json("No existe el usuario");
    }
    if (bcrypt.compareSync(password, userDB.password)) {
      const token = generateSign(userDB._id, userDB.email);
      return res.status(200).json({ token, userDB });
    } else {
      return res.status(400).json("La contraseña es incorrecta");
    }
  } catch (error) {
    return res.status(500).json("Error al loguear el usuario");
  }
});

// Cerrar sesión de usuario
router.post("/logout", async (req, res) => {
  try {
    const token = null;
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Otras rutas de gestión de usuarios (editar, eliminar, etc.)

module.exports = router;

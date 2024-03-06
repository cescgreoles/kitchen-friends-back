const express = require("express");
const Tipo = require("./tipos.model");
const router = express.Router();
const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { deleteFile } = require("../../middlewares/deleteFile");

router.get("/", async (req, res, next) => {
  try {
    const allTipos = await Tipo.find();
    return res.status(200).json(allTipos);
  } catch (error) {
    return next(error);
  }
});

router.post("/create", upload.single("img"), async (req, res, next) => {
  try {
    const tipo = req.body;
    const newTipo = new Type(tipo);
    const created = await newTipo.save();
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const tipo = await Tipo.findById(id);
    await tipo.findByIdAndDelete(id);
    return res.status(200).json({ message: "Ingrediente eliminado con éxito" });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

const express = require("express");
const Apat = require("./apats.model");
const router = express.Router();
const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { deleteFile } = require("../../middlewares/deleteFile");

router.get("/", async (req, res, next) => {
  try {
    const allApats = await Apat.find();
    return res.status(200).json(allApats);
  } catch (error) {
    return next(error);
  }
});

router.post("/create", upload.single("img"), async (req, res, next) => {
  try {
    const apat = req.body;
    const newApat = new Apat(apat);
    const created = await newApat.save();
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const apat = await Apat.findById(id);
    await Apat.findByIdAndDelete(id);
    return res.status(200).json({ message: "Ingrediente eliminado con éxito" });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

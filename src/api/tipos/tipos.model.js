const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tiposSchema = new Schema({
  name: { type: String, required: true, trim: true },
});

const Tipo = mongoose.model("Tipo", tiposSchema);

module.exports = Tipo;

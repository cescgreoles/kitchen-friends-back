const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const apatsSchema = new Schema({
  name: { type: String, required: true, trim: true },
});

const Apat = mongoose.model("Apat", apatsSchema);

module.exports = Apat;

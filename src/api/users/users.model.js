const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    rol: { type: String, default: "user" },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

// Modificamos el prehook 'save' para hashear la contraseña solo si es nueva o ha sido modificada
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hashear la contraseña antes de guardar el usuario
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;

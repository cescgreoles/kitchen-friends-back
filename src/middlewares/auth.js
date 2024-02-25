const User = require("../api/users/users.model");
const { verifyJwt } = require("../utils/jwt/jwt");

// Ejemplo de middleware isAuth
const isAuth = (req, res, next) => {
  // Verifica la existencia del token en el encabezado de la solicitud
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No hay token, autorización denegada" });
  }

  // Verifica y decodifica el token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next(); // Continúa con la siguiente middleware o la función de enrutador
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ msg: "Token no válido" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next("No autorizado");
    }
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken);
    const userLogged = await User.findById(validToken.id);

    if (userLogged.rol === "admin") {
      userLogged.password = null;
      req.user = userLogged;
      next();
    } else {
      return next("No eres administrador");
    }
  } catch (error) {
    return next("Error");
  }
};

module.exports = { isAuth, isAdmin };

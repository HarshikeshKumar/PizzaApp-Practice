import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";

async function isLoggedIn(req, res, next) {
  const token = req.cookies["authToken"];

  if (!token) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "Not Authenticated",
      message: "No Auth Token provided",
    });
  }

  // Agar token mila hai
  const decoded = jwt.verify(token, JWT_SECRET);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "Not Authenticated",
      message: "Invalid Token provided",
    });
  }

  // If reached here, then user is authentocated allow them to access the API

  req.user = {
    email: decoded.email,
    id: decoded.id,
  };

  next();
}

export default isLoggedIn;

// cliens --> middleware --> controller

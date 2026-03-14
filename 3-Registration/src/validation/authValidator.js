import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";
import UnauthorizedError from "../utils/unauthorizedError.js";

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
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      throw new UnauthorizedError();
    }
    // If reached here, then user is authentocated allow them to access the API

    req.user = {
      email: decoded.email,
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      data: {},
      error: error,
      message: "Invalid Token provided",
    });
  }
}

/*
This function checks if the authenticated user is an admin or not ?.
Because we will call isAdmin after isLoggedIn thats why we will recieve user details.
*/
async function isAdmin(req, res, next) {
  const loggedInUser = req.user;
  console.log(loggedInUser);
  if (loggedInUser.role === "ADMIN") {
    console.log("User is an ADMIN");
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not Authorized for this action",
      data: {},
      error: {
        statusCode: 401,
        reason: "Unauthorized user for this action",
      },
    });
  }
}

export { isLoggedIn, isAdmin };

// cliens --> middleware --> controller

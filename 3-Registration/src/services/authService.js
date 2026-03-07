import { findUserRepo } from "../repository/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRY, JWT_SECRET } from "../config/serverConfig.js";

async function loginUser(authDetails) {
  const email = authDetails.email;
  const plainPassword = authDetails.password;

  // 1. If there is a registered user with the given email
  const user = await findUserRepo({ email });

  if (!user) {
    throw {
      message: "No user found with the given email",
      statusCode: 404,
    };
  }

  // 2. If the user is found we need to compare plainPassword with hashedPassword
  const isPasswordValidated = await bcrypt.compare(
    plainPassword,
    user.password,
  );

  if (!isPasswordValidated) {
    throw {
      message: "Invalid password, Please try again",
      statusCode: 401, // 401-->Unauthorized
    };
  }

  // 3. If the password is validated, Create a token and return it

  const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
  return token;
}

export default loginUser;

import { createUserRepo, findUserRepo } from "../repository/userRepository.js";
import { createCartRepo } from "../repository/cartRepository.js";

async function createUserService(userDetails) {
  // 1. We need to check user is already exists or not..
  const user = await findUserRepo({
    email: userDetails.email,
    mobileNumber: userDetails.mobileNumber,
  });
  // 2. If user is already exists......
  if (user) {
    throw {
      reason: "User is already exists with this email or phone number",
      statusCode: 400,
    };
  }

  // 3. If user is not exists then Create user
  const newUser = await createUserRepo({
    email: userDetails.email,
    mobileNumber: userDetails.mobileNumber,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    password: userDetails.password,
  });
  // 4. Agar user ham create hi nhi krr paye...
  if (!newUser) {
    throw {
      reason: "Something went wrong, Cannot created user",
      statusCode: 500,
    };
  }

  // Create Cart...................
  await createCartRepo(newUser._id);

  // 5. If user Created then return new user....
  return newUser;
}

export { createUserService };

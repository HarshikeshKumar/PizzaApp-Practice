import UserService from "../services/userService.js";
import UserRepository from "./../repository/userRepository.js";

async function createUser(req, res) {
  console.log(req.body);

  // UserService ka object Create kiya aur usme UserRepository ka Object pass kiya
  const userService = new UserService(new UserRepository());

  try {
    const response = await userService.registerUser(req.body);

    // Agar User create ho gaya toh..
    return res.status(201).json({
      message: "Successfully Created user",
      success: true,
      data: response,
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.reason,
      success: false,
      data: {},
      error: error,
    });
  }
}

export default createUser;

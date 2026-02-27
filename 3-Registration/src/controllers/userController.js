import UserRepository from "../repository/userRepository.js";
import UserService from "../services/userService.js";

async function createUser(req, res) {
  console.log(req.body);
  console.log("User Controller Called");

  const userService = new UserService(new UserRepository());

  try {
    const response = await userService.createUserService(req.body);

    return res.status(201).json({
      success: true,
      message: "Successfully Created user",
      data: response,
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.reason,
      error: error,
      data: {},
    });
  }
}

export default createUser;

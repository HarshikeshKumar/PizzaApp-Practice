import UserRepository from "../repository/userRepository.js";
import UserService from "../service/userService.js";

async function createUser(req, res) {
  console.log(req.body);
  const userService = new UserService(new UserRepository());

  try {
    const response = await userService.registerUser(req.body);

    return res.status(201).json({
      message: "Successfully Created User",
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

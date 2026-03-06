import { createUserService } from "../services/userService.js";

async function createUser(req, res) {
  console.log(req.body);
  console.log("User Controller Called");

  try {
    const response = await createUserService(req.body);

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

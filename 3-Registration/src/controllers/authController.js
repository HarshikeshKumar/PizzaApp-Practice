import loginUser from "../services/authService.js";

async function loginController(req, res) {
  // authService call
  try {
    const loginPayload = req.body;
    const response = await loginUser(loginPayload);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: response, // data me token bhej dunga
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: {},
      error: error,
    });
  }
}

export default loginController;

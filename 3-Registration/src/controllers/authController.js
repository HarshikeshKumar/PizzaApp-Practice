import loginUser from "../services/authService.js";

async function loginController(req, res) {
  // authService call
  try {
    const loginPayload = req.body;
    const response = await loginUser(loginPayload);

    // Set Token in httpOnly cookie
    res.cookie("authToken", response, {
      httpOnly: true,
      success: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days ko milisec me convert kiya
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      // data: response, // data me token bhej dunga
      data: {},
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

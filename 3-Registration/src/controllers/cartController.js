import {
  modifyCart,
  getCartByUserIdService,
  clearProductFromCart,
} from "../services/cartService.js";
import AppError from "../utils/appError.js";

async function getCartByUserIdController(req, res) {
  try {
    // const cart = await getCartByUserIdService(req.body.userId);
    const cart = await getCartByUserIdService(req.user.id); // crtRouter me isLoggedIn se protect krne ke baad ham direct req.user me se id nikal skte hai.
    return res.status(200).json({
      success: false,
      message: "Successfully fetched the cart",
      error: {},
      data: cart,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      error: error,
    });
  }
}

// Add Product to Cart....................
async function modifyProductToCart(req, res) {
  try {
    const cart = await modifyCart(
      req.user.id,
      req.params.productId,
      req.params.operation == "add",
    );
    return res.status(200).json({
      success: false,
      message: "Successfully added product to the cart",
      error: {},
      data: cart,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      error: error,
    });
  }
}

// Clear Product from Cart...............................
async function clearCartById(req, res) {
  try {
    const cart = await clearProductFromCart(req.user.id);
    return res.status(200).json({
      success: false,
      message: "Successfully cleared all products from the cart",
      error: {},
      data: cart,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      error: error,
    });
  }
}

// export { getCartByUserIdController, addProductToCart };
export { getCartByUserIdController, modifyProductToCart, clearCartById };

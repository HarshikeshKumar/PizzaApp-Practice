import Cart from "../schema/cartSchema.js";
import BadRequestError from "../utils/badRequestError.js";
import InternalServerError from "../utils/internalServerError.js";
import NotFoundError from "../utils/notFoundError.js";

// Create Cart By user.................
async function createCartRepo(userId) {
  try {
    const newCart = await Cart.create({
      user: userId,
    });
    return newCart;
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessageList = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });
      throw new BadRequestError(errorMessageList);
    }
    console.log(error);
    throw new InternalServerError();
  }
}

// Get Cart By User Id....................
async function getCartByUserIdRepo(userId) {
  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product"); // populate krne se Pura ka pura product fetch hoke aayega items ke under
    return cart;
  } catch (error) {
    console.log(error);
    throw new InternalServerError();
  }
}

// Clear Cart...................
async function clraeCart(userId) {
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new NotFoundError("Cart");
    }
    cart.items = [];
    await cart.save();
    return cart;
  } catch (error) {
    throw new InternalServerError();
  }
}

export { createCartRepo, getCartByUserIdRepo, clraeCart };

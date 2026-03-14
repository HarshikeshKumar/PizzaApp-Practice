import {
  clraeCart,
  getCartByUserIdRepo,
} from "../repository/cartRepository.js";
import NotFoundError from "../utils/notFoundError.js";
import { getProductById } from "../repository/productRepository.js";
import BadRequestError from "../utils/badRequestError.js";
import AppError from "../utils/appError.js";

// Get Cart By User Id........................
async function getCartByUserIdService(userId) {
  const cart = await getCartByUserIdRepo(userId);
  if (!cart) {
    throw new NotFoundError("Cart");
  }

  return cart;
}

// Add to Cart.................
// async function addToCart(userId, productId) {
//   const cart = await getCartByUserIdRepo(userId);
//   const product = await getProductById(productId);
//   if (!product) {
//     throw new NotFoundError("Product");
//   }
//   if (!product.inStock && product.quantity <= 0) {
//     throw new BadRequestError(["Product not available in stock"]);
//   }

//   // May be the product is already in the cart
//   let foundProduct = false;
//   cart.items.forEach((item) => {
//     console.log(item);

//     if (item.product._id == productId) {
//       // ^If use === then use like this (item.product.toString() === productId)
//       if (product.quantity >= item.quantity + 1) {
//         item.quantity += 1;
//       } else {
//         throw new AppError(
//           "The quantity of the item requested is not available",
//           404,
//         );
//       }
//       foundProduct = true;
//     }
//   });
//   if (!foundProduct) {
//     cart.items.push({
//       product: productId,
//       quantity: 1,
//     });
//   }
//   await cart.save();

//   product.quantity -= 1;

//   await product.save();

//   return cart;
// }

// Modify Cart addToCart and removeFromCart dono functionality ek hi function me...
async function modifyCart(userId, productId, shouldAdd = true) {
  const quantityValue = shouldAdd == true ? 1 : -1;
  const cart = await getCartByUserIdRepo(userId);
  const product = await getProductById(productId);
  if (!product) {
    throw new NotFoundError("Product");
  }
  if (!product.inStock && product.quantity <= 0) {
    // if (shouldAdd && (!product.inStock || product.quantity <= 0)) {
    throw new BadRequestError(["Product not available in stock"]);
  }

  // May be the product is already in the cart
  let foundProduct = false;
  cart.items.forEach((item) => {
    console.log(item);

    if (item.product._id == productId) {
      // ^If use === then use like this (item.product.toString() === productId)
      if (shouldAdd) {
        if (product.quantity >= item.quantity + 1) {
          item.quantity += quantityValue;
        } else {
          throw new AppError(
            "The quantity of the item requested is not available",
            404,
          );
        }
      } else {
        if (item.quantity > 0) {
          item.quantity += quantityValue;
          if (item.quantity == 0) {
            cart.items = cart.items.filter(
              (item) => item.product._id != productId,
            );
            foundProduct = true;
            return;
          }
        } else {
          throw new AppError(
            "The quantity of the item requested is not available",
            404,
          );
        }
      }
      foundProduct = true;
    }
  });
  if (!foundProduct) {
    if (shouldAdd) {
      cart.items.push({
        product: productId,
        quantity: 1,
      });
    } else {
      throw new NotFoundError("Product in the cart");
    }
  }
  await cart.save();

  // product.quantity -= 1;
  product.quantity += shouldAdd ? -1 : 1;

  await product.save();

  return cart;
}

// Clear Product from cart...............
async function clearProductFromCart(userId) {
  const response = await clraeCart(userId);
  return response;
}

// export { getCartByUserIdService, addToCart };
export { getCartByUserIdService, modifyCart, clearProductFromCart };

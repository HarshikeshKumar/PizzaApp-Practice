// import { getCartByUserIdService } from "../services/cartService.js";
// import AppError from "../utils/appError.js";

// async function getCartByUserIdController(req, res) {
//   try {
//     // const cart = await getCartByUserIdService(req.body.userId);
//     const cart = await getCartByUserIdService(req.user.id); // crtRouter me isLoggedIn se protect krne ke baad ham direct req.user me se id nikal skte hai.
//     return res.status(200).json({
//       success: false,
//       message: "Successfully fetched the cart",
//       error: {},
//       data: cart,
//     });
//   } catch (error) {
//     console.log(error);
//     if (error instanceof AppError) {
//       return res.status(error.statusCode).json({
//         success: false,
//         message: error.message,
//         data: {},
//         error: error,
//       });
//     }
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       data: {},
//       error: error,
//     });
//   }
// }

// export { getCartByUserIdController };

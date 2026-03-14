import express from "express";
import { isLoggedIn } from "../validation/authValidator.js";

import {
  modifyProductToCart,
  getCartByUserIdController,
  clearCartById,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.get("/", isLoggedIn, getCartByUserIdController); // Ab LoggedIn user direct cart ke fetch krr skta hai

cartRouter.post("/:operation/:productId", isLoggedIn, modifyProductToCart);

cartRouter.delete("/products", isLoggedIn, clearCartById);

export default cartRouter;

import express from "express";
import { isLoggedIn } from "../validation/authValidator.js";

import {
  modifyProductToCart,
  getCartByUserIdController,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.get("/", isLoggedIn, getCartByUserIdController); // Ab LoggedIn user direct cart ke fetch krr skta hai

cartRouter.post("/:operation/:productId", isLoggedIn, modifyProductToCart);

export default cartRouter;

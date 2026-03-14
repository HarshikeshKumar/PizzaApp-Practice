import express from "express";
import {
  createProductController,
  deleteProductByIdController,
  getProductByIdController,
} from "../controllers/productController.js";
import uploader from "../middlewares/multerMiddleware.js";
import { isAdmin, isLoggedIn } from "../validation/authValidator.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  uploader.single("productImage"),
  createProductController,
);

productRouter.get("/:id", getProductByIdController);
productRouter.delete("/:id", deleteProductByIdController);

export default productRouter;

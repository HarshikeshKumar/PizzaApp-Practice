import express from "express";
import {
  createProductController,
  deleteProductByIdController,
  getProductByIdController,
} from "../controllers/productController.js";
import uploader from "../middlewares/multerMiddleware.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  uploader.single("productImage"),
  createProductController,
);

productRouter.get("/:id", getProductByIdController);
productRouter.delete("/:id", deleteProductByIdController);

export default productRouter;

import express from "express";
import { createProductController } from "../controllers/productController.js";
import uploader from "../middlewares/multerMiddleware.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  uploader.single("productImage"),
  createProductController,
);

export default productRouter;

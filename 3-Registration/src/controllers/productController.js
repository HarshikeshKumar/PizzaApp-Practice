import { createProductService } from "../services/productService.js";

async function createProductController(req, res) {
  try {
    const product = await createProductService({
      productName: req.body.productName,
      description: req.body.description,
      imagePath: req.file.path,
      price: req.body.price,
      category: req.body.category, // If category is undefined, veg will be stored
      inStock: req.body.inStock, // If inStock is undefined then true will be stored
    });
    return res.status(201).json({
      success: true,
      message: "Successfully create the the product",
      error: {},
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      success: false,
      message: error.reason,
      data: {},
      error: error,
    });
  }
}

export { createProductController };

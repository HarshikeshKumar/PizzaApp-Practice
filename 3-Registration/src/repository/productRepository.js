import Product from "../schema/productSchema.js";

// Create Product................................
async function createProductRepo(productDetils) {
  try {
    const response = await Product.create({ ...productDetils });
    return response;
  } catch (error) {
    console.log(error);
  }
}

// Find Product by Id....................
async function getProductById(productId) {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    console.log(error);
  }
}

// Delete Product by Id....................
async function deleteProductById(productId) {
  try {
    const response = await Product.findByIdAndDelete(productId);
    return true;
  } catch (error) {
    console.log(error);
  }
}

export { createProductRepo, getProductById, deleteProductById };

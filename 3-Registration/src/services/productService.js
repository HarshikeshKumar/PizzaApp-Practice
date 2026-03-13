import clousinary from "../config/cloudinaryConfig.js";
import {
  createProductRepo,
  deleteProductById,
  getProductById,
} from "../repository/productRepository.js";
import fs from "fs/promises";

async function createProductService(productDetils) {
  // 1. We should check if an image is coming to create the prpduct, then we should first upload in it on cloudinary
  const imagePath = productDetils.imagePath;
  if (imagePath) {
    try {
      const cloudinaryResponse = await clousinary.uploader.upload(imagePath);
      var productImage = cloudinaryResponse.secure_url;
      await fs.unlink(imagePath);
    } catch (error) {
      console.log(error);
      throw {
        reason: "Not able to create product",
        statusCode: 500,
      };
    }
  }

  // 2. Then use the url from cloudinary and other product details to add product in DB
  const product = await createProductRepo({
    ...productDetils,
    productImage: productImage,
  });

  if (!product) {
    throw {
      reason: "Not able to create product",
      statusCode: 500,
    };
  }

  return product;
}

// Get productById Service Layer.............
async function getProductByIdService(productId) {
  const response = await getProductById(productId);
  if (!response) {
    throw {
      reason: "Not able to find the product",
      statusCode: 404,
    };
  }
  return response;
}

// Delete productById Service Layer...............
async function deleteProductByIdService(productId) {
  const response = await deleteProductById(productId);
  if (!response) {
    throw {
      reason: "Cannot delete the product",
      statusCode: 500,
    };
  }
  return response;
}

export {
  createProductService,
  getProductByIdService,
  deleteProductByIdService,
};

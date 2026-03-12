import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      minlength: [5, "Product name must be atleast 5 characters"],
      trim: true,
    },

    description: {
      type: String,
      minlength: [5, "Product description must be atleast 5 characters"],
    },

    productImage: {
      type: String,
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
    },

    category: {
      type: String,
      enum: ["veg", "non-veg", "drinks", "sides"], // In 4 variable me se hi koi ek daal paoge
      default: "veg",
    },

    inStock: {
      type: Boolean,
      required: [true, "In stock status is required"],
      default: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;

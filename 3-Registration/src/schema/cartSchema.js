import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // user ki Id Store hogi Dusre Model se
      ref: "User", // User modele se Id layega, This is callse Association
      required: true,
      unique: true, // Ek user ke 2 cart create nhi krr paoge.
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId, // Ye v Id hogi But
          ref: "Product", // But Product model ki Id hogi
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ], // Items Array me har baari ek object hogi, uss object ke under 2 properties hogi product aur quantity, Jab bhi Cart pe uper order place krenge toh on the go saare items ke uper Iterate krenge, Har product ka price fetch krenge aur usko quantity se multiply krr ke uska totalPrice calculate krenge.
  },
  { timestamps: true },
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;

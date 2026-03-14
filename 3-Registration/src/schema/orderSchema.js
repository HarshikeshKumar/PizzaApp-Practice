import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "ORDERED",
        "CANCELLED",
        "DELIVERED",
        "PROGRESSING",
        "OUT_FOR_DELIVERY",
      ],
      default: "ORDERED",
    },

    address: {
      type: String,
      minlength: [10, "Address should be of atleast 10 cgaracters"],
    },

    paymentMethod: {
      type: String,
      enum: ["ONLINE", "CASH"],
      default: "CASH",
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

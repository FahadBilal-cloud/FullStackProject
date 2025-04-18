import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Canceled"],
      default: "Processing",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },
    // User information
    userInfo: {
      firstName: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true,
      },
      apartment: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: String,
        required: true,
      },
      emailAddress: {
        type: String,
        required: true,
      },
      saveInfo: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);

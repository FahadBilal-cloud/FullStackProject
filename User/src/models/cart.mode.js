import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Refers to the user who added items to the cart
    required: true,
  },
  items: [
    {
      product: {
        id:Number,
        title:String,
        imageUrl:String,
        price:Number,
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
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
},{
    timestamps:true
});

cartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((acc, item) => acc + item.totalPrice, 0);
  next();
});

export const Cart = mongoose.model("Cart", cartSchema);

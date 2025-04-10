import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import Stripe from "stripe";

const payment = asyncHandler(async (req, res) => {
    const { orderId } = req.body;
  
    // console.log(orderId);
    
    if (!orderId) {
      throw new ApiError(400, "Order ID is required");
    }
  
    const userId = req.user._id;
  
    // Check if order exists
    const order = await Order.findById(orderId)
    if (!order) {
      throw new ApiError(404, "Order not found!");
    }
  
    // Stripe Line Items
    const line_items = order.orderItems.map((item) => ({
      price_data: {
        currency: "PKR",
        product_data: {
          name: item.product.title,
        },
        unit_amount: item.product.price * 100, // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    // console.log(line_items);
    
  
    const stripe = new Stripe(process.env.STRIPE_SECRET);
  
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `http://localhost:5173/success`,
      cancel_url: `http://localhost:5173/cancel`,
      metadata: {
        orderId: orderId,
        userId: userId.toString(),
      },
    });

    // console.log(session);
    
  
    return res
      .status(200)
      .json(new ApiResponse(200, { id: session.id }, "Checkout session created"));
  });
  

export { payment };

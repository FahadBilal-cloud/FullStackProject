import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import Stripe from "stripe";
import { Payment } from "../models/payment.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET);

const payment = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  // console.log(orderId);

  if (!orderId) {
    throw new ApiError(400, "Order ID is required");
  }

  const userId = req.user._id;

  // Check if order exists
  const order = await Order.findById(orderId);
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

  //  console.log("LineItems",line_items);

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

  // console.log("Session",session);

  return res
    .status(200)
    .json(new ApiResponse(200, { id: session.id }, "Checkout session created"));
});

const webhookHandler = asyncHandler(async (req, res) => {
  // console.log("Headers",req.headers);

  const sig = req.headers["stripe-signature"];
  //  console.log("Sig",sig);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    throw new ApiError(400, `Webhook Error: ${err.message}`);
  }

  //  console.log("Event",event);

  // Payment Success
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;
    const userId = session.metadata.userId;

    //  console.log("Session",session);

    const order = await Order.findById(orderId);
    // console.log(order);

    if (!order) throw new ApiError(404, "Order not found");

    const payment = new Payment({
      user: userId,
      order: orderId,
      transactionId: session.id,
      amountPaid: session.amount_total / 100,
      paymentGateway: "Stripe",
      currency: session.currency.toUpperCase(),
      paymentStatus: "Paid",
    });

    await payment.save();
    // console.log(payment);

    order.paymentStatus = "Paid";
    order.orderStatus = "Processing";
    await order.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { received: true }, "Webhook received"));
});

export { payment, webhookHandler };

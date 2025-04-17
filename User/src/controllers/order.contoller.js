import { Cart } from "../models/cart.mode.js";
import { Invoice } from "../models/invoice.model.js";
import { Order } from "../models/order.model.js";
import { Payment } from "../models/payment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Controller for placing an order (Checkout)
const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Fetch cart data
  const cart = await Cart.findOne({ user: userId });

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty!");
  }

  const { orderData } = req.body;
  const {
    firstName,
    streetAddress,
    apartment,
    city,
    phoneNo,
    emailAddress,
    saveInfo,
    paymentMethod,
  } = orderData;

  if (
    [
      firstName,
      streetAddress,
      apartment,
      city,
      phoneNo,
      emailAddress,
      saveInfo,
      paymentMethod,
    ].some((field) => field === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  let orderStatus = paymentMethod === "Cash on delivery" ? "Shipped" : "Processing";

  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.price,
    totalPrice: item.totalPrice,
  }));

  const order = new Order({
    user: userId,
    orderItems,
    totalAmount: cart.totalAmount,
    paymentMethod,
    orderStatus,
    userInfo: {
      firstName,
      streetAddress,
      apartment,
      city,
      phoneNo,
      emailAddress,
      saveInfo,
    },
  });

  await order.save();

  // Handle payment & invoice if COD
  if (paymentMethod === "Cash on delivery") {
    const payment = new Payment({
      user: userId,
      order: order._id,
      transactionId: `COD${Date.now()}`,
      amountPaid: 0,
      paymentGateway: "COD",
      currency: "PKR",
    });

    await payment.save();

    const invoice = new Invoice({
      user: userId,
      payment: payment._id,
      order: order._id,
      invoiceNumber: `INV-${Date.now()}`,
      items: orderItems,
      totalAmount: cart.totalAmount,
      billingAddress: {
        fullName: firstName,
        address: streetAddress,
        city,
      },
    });

    await invoice.save();
  }

  // Empty cart
  await Cart.findOneAndDelete({ user: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order placed successfully"));
});


// export const getOrderById = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     // Find the order by ID and populate product details
//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found!" });
//     }

//     res.status(200).json({ success: true, order });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status, notes } = req.body;

//     // Find the order by ID
//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found!" });
//     }

//     // Add a new checkpoint for the order
//     order.checkpoints.push({
//       status,
//       notes,
//       updatedAt: new Date(),
//     });

//     // Update the order's current status
//     order.orderStatus = status;

//     // Save the updated order
//     await order.save();

//     res.status(200).json({ success: true, order });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getUserOrders = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     // Find all orders for the user
//     const orders = await Order.find({ user: userId });

//     if (!orders || orders.length === 0) {
//       return res.status(404).json({ message: "No orders found!" });
//     }

//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export { placeOrder };

import { Cart } from "../models/cart.mode.js";
import { Order } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Controller for placing an order (Checkout)
const placeOrder = asyncHandler( async (req, res) => {
    const userId = req.user._id;
    
    // Fetch cart data
    const cart = await Cart.findOne({ user: userId });
    // console.log(cart);
    

    if (!cart || cart.items.length === 0) {
      throw new ApiError(400,"Cart is empty!")
    }
    const {orderData} = req.body
    const { firstName, streetAddress, apartment, city, phoneNo, emailAddress, saveInfo, paymentMethod } = orderData;
    if (
      [firstName, streetAddress, apartment, city, phoneNo, emailAddress, saveInfo, paymentMethod].some(
        (field) => field === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const order = new Order({
      user: userId,
      orderItems: cart.items.map(item => ({
        product: {
            id:item.product.id,
            title:item.product.title,
            imageUrl:item.product.imageUrl,
            price:item.product.price,
          },
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.price * item.quantity,
      })),
      totalAmount: cart.totalAmount,
      paymentMethod,
      orderStatus: "Processing",
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

    await Cart.findOneAndDelete({ user: userId });

    return res
    .status(200)
    .json(new ApiResponse(200,order,"Order placed Sucessfully"))
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


export {placeOrder}
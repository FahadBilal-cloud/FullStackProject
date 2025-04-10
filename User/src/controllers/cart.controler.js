import { Cart } from "../models/cart.mode.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.find({ user: req.user?._id })

  if (!cart) {
    throw new ApiError(404, "Cart Not Found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, cart[0], "Cart fetched sucessfully"));
});

const addToCart = asyncHandler(async (req, res) => {
  const { product, quantity } = req.body;
  const { id, title, imageUrl, price } = product;
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart || !cart.items) {
    // Create new cart if it doesn't exist
    cart = new Cart({
      user: req.user._id,
      items: [],
      totalAmount: 0,
    });
  }

//   if (!cart || !cart.items) {
//     throw new Error("Cart not found or items are undefined");
// }
  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(item => item.product.id === id);
  

  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    cart.items[existingItemIndex].quantity += quantity;
    cart.items[existingItemIndex].totalPrice =
      cart.items[existingItemIndex].quantity * product.price;
  } else {
    // Add new item to cart
    cart.items.push({
      product: {
        id,
        title,
        imageUrl,
        price,
      },
      quantity,
      price: product.price,
      totalPrice: quantity * product.price,
    });
  }

  cart.totalAmount = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);

  await cart.save();
  return res
    .status(201)
    .json(new ApiResponse(201, cart, "Product add to cart Sucessfully"));
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    throw new ApiError(400, "Quantity must be at least 1");
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    throw new ApiError(404, "Item not found in cart");
  }

  // Update quantity and total price
  cart.items[itemIndex].quantity = quantity;
  cart.items[itemIndex].totalPrice = quantity * cart.items[itemIndex].price;

  await cart.save();
  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart updated Sucessfully"));
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    throw new ApiError(404, "Item not found in cart");
  }

  // Remove the item from the array
  cart.items.splice(itemIndex, 1);

  await cart.save();
  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart removed Sucessfully"));
});


export { getCart, addToCart, updateCartItem, removeFromCart };

import { Cart } from "../models/cart.mode.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.find({ user: req.user?._id });

  if (!cart) {
    throw new ApiError(404, "Cart Not Found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, cart[0], "Cart fetched sucessfully"));
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  // Validate input
  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid product or quantity"));
  }

  // Check if product exists
  const product = await Product.findById(productId);
  // console.log("Product",product);
  
  if (!product) {
    return res.status(404).json(new ApiResponse(404, null, "Product not found"));
  }

  // Compute actual price after discount
  const price = Math.floor(product.originalPrice - (product.originalPrice * product.discount) / 100);

  // Find or create cart
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: [],
      totalAmount: 0,
    });
  }

  // Check if product already in cart
  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === product._id.toString()
  );
  if (existingItemIndex >= 0) {
    // Update quantity
    cart.items[existingItemIndex].quantity += quantity;
    cart.items[existingItemIndex].totalPrice =
      cart.items[existingItemIndex].quantity * price;
  } else {
    // Add new product to cart
    cart.items.push({
      product: product._id,
      quantity,
      price,
      totalPrice: quantity * price,
    });
  }

  // Update total amount
  cart.totalAmount = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);

  await cart.save();

  await cart.populate("items.product");

  // Format response to include selected product details
  const formattedCart = {
    _id: cart._id,
    user: cart.user,
    totalAmount: cart.totalAmount,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
    items: cart.items.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      product: {
        _id: item.product._id,
        name: item.product.name,
        productUrl: item.product.productUrl[0], // assuming you want the first image
        price: item.price,
      },
    })),
  };

  return res
    .status(201)
    .json(new ApiResponse(201, formattedCart, "Product added to cart successfully"));
});


const updateCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
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
  cart.totalAmount = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);


  await cart.save();
  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart removed Sucessfully"));
});

export { getCart, addToCart, updateCartItem, removeFromCart };

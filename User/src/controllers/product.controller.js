import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  if (!products || products.length === 0) {
    throw new ApiError(404, "Products Not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "All Products fetched Successfully"));
});

export { getAllProducts };

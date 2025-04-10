import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { 
  addToCartApi, 
  updateCartItemApi, 
  removeFromCartApi, 
  fetchCartApi 
} from "../config/Api.config";
import { CartResponse, ApiError, Product } from "../Types/Cart.types";
import { toast } from "react-toastify";

// Async Thunks for API operations
export const fetchCart = createAsyncThunk<CartResponse, string, { rejectValue: ApiError }>(
  "cart/fetchCart",
  async (token, { rejectWithValue }) => {
    try {
      const data = await fetchCartApi(token);
      // console.log(data);
      // toast.success(data.message)
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch cart";
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const addItemToCart = createAsyncThunk<CartResponse, { token: string, product: Product; quantity: number }, { rejectValue: ApiError }>(
  "cart/addItem",
  async ({ token, product, quantity }, { rejectWithValue }) => {
    try {
      const data = await addToCartApi(token,product,quantity);
      toast.success(data.message)
      // console.log(data);
      return data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to add item to cart";
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const updateCartItem = createAsyncThunk<CartResponse, { token: string, itemId: string; quantity: number }, { rejectValue: ApiError }>(
  "cart/updateItem",
  async ({ token, itemId, quantity }, { rejectWithValue }) => {
    try {
      const data = await updateCartItemApi(token, itemId, quantity);
      // toast.success(data.message)
      // console.log(data);
      
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update cart item";
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const removeCartItem = createAsyncThunk<CartResponse, {token:string, itemId:string}, { rejectValue: ApiError }>(
  "cart/removeItem",
  async ({token, itemId}, { rejectWithValue }) => {
    try {
      const data = await removeFromCartApi(token, itemId);
      toast.success(data.message)
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to remove item from cart";
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// export const clearCart = createAsyncThunk<CartResponse, string, { rejectValue: ApiError }>(
//   "cart/clearCart",
//   async (token, { rejectWithValue }) => {
//     try {
//       const data = await clearCartApi(token);
//       toast.success(data.message)
//       return data;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "Failed to clear cart";
//       toast.error(errorMessage);
//       return rejectWithValue({ message: errorMessage });
//     }
//   }
// );

// State interface
interface CartState {
  cart: CartResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null; 
      state.error = null;
      state.loading=false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch cart";
      })
      
      // Add Item
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add item to cart";
      })
      
      // Update Item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update cart item";
      })
      
      // Remove Item
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to remove item from cart";
      })
  },
});

export const {clearCart} = cartSlice.actions
export default cartSlice.reducer;
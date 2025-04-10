import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchProductsApi } from "../config/Product.config";
import { Product, ProductResponse, ApiError } from "../Types/Product.types";
import { toast } from "react-toastify";

export const fetchProducts = createAsyncThunk<ProductResponse, void, { rejectValue: ApiError }>(
    "products/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchProductsApi();
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch products";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);


interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductResponse>) => {
                state.loading = false;
                state.products = action.payload.data;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch products";
            })
    },
});

export default productSlice.reducer;

// features/order/orderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderResponse, OrderFormData, ApiError } from "../Types/Order.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { placeOrder } from "../config/Api.config";
import { toast } from "react-toastify";

export const placeOrderThunk = createAsyncThunk<
    OrderResponse,
    { token: string; orderData: OrderFormData },
    { rejectValue: ApiError }
>(
    "order/placeOrder",
    async ({ token, orderData }, { rejectWithValue }) => {
        try {
            const data = await placeOrder(token, orderData);
            //  console.log(data);
            toast.success(data.message)
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to update cart item";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);

interface OrderState {
    loading: boolean;
    error: string | null;
    order: OrderResponse["data"] | null;
}

const initialState: OrderState = {
    loading: false,
    error: null,
    order: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearOrderState: (state) => {
            state.loading = false;
            state.error = null;
            state.order = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrderThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeOrderThunk.fulfilled, (state, action:PayloadAction<OrderResponse>) => {
                state.loading = false;
                state.order = action.payload.data;
            })
            .addCase(placeOrderThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Something went wrong";
            });
    },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;

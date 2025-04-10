import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginApi, registerApi, logoutApi, userApi } from "../config/Api.config";
import { ApiError, SignInResponse, User, UserData } from "../Types/Auth.types";
import { toast } from "react-toastify";
import { SignUpData, SignUpResponse } from "../Types/SignUp.type";
import { LogoutResponse } from "../Types/LogoutResponse";
// import axios from "axios";
import { UserResponse } from "../Types/User.types";



export const loginUser = createAsyncThunk<SignInResponse, UserData, { rejectValue: ApiError }>("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const data = await loginApi(userData)
        // console.log(data);
        // localStorage.setItem("token",JSON.stringify(data.data.token))
        toast.success(data.message)

        return data
    } catch (error) {
        const errorMessgae = error instanceof Error ? error.message : "Login Failed"
        toast.error(errorMessgae)
        return rejectWithValue({ message: errorMessgae })
    }
})

export const registerUser = createAsyncThunk<SignUpResponse, SignUpData, { rejectValue: ApiError }>("auth/register", async (userData, { rejectWithValue }) => {
    try {
        const data = await registerApi(userData)
        toast.success(data.message)
        console.log(data);
        return data
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "Registration Failed"
        toast.error(errMessage)
        return rejectWithValue({ message: errMessage })
    }
})

export const logoutUser = createAsyncThunk<LogoutResponse, string, { rejectValue: ApiError }>("auth/logout", async (token, { rejectWithValue }) => {

    try {
        const data = await logoutApi(token)
        toast.success(data.message)
        return data
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "Student not authenticated"
        toast.error(errMessage)
        return rejectWithValue({ message: errMessage })
    }
})

export const fetchUser = createAsyncThunk<UserResponse,{rejectValue:ApiError}>("auth/fetchUser", async (_, {rejectWithValue}) => {
    try {
        const data = await userApi()
        toast.success(data.message);
        console.log(data);
        
        return data
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "You not authenticated"
        toast.error(errMessage)
        return rejectWithValue({ message: errMessage })
    }
});


interface AuthState {
    user: object | null,
    loading: boolean,
    error: string | null
}

const initialState: AuthState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<SignInResponse>) => {
                // console.log("Action", action.payload);

                state.loading = false
                state.user = action.payload.data.user
                localStorage.setItem("user", JSON.stringify(action.payload.data.user))
                localStorage.setItem("token", JSON.stringify(action.payload.data.token))
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<ApiError | undefined>) => {
                state.loading = false,
                    state.error = action.payload?.message || "Login Failed"
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<ApiError | undefined>) => {
                state.loading = false,
                    state.error = action.payload?.message || "Registration Failed"
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false
                state.user = null,
                    localStorage.removeItem("token");
                localStorage.removeItem("user")
            })
            .addCase(logoutUser.rejected, (state, action: PayloadAction<ApiError | undefined>) => {
                state.loading = false,
                    state.error = action.payload?.message || "Student not authenticated"
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(fetchUser.fulfilled, (state, action:PayloadAction<UserResponse>) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(action.payload)); // Store user session
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                
                // If the request was rejected with a value
                if (action.payload && (action.meta as any)?.rejectedWithValue) {
                    state.error = (action.payload as ApiError).message || "You are not authenticated";
                } else {
                    state.error = action.error.message || "Something went wrong";
                }
            });
            
    }
})

export const { setUser } = authSlice.actions;

export default authSlice.reducer


import axios from "axios";
import { ApiError, SignInResponse, UserData } from "../Types/Auth.types";
import { SignUpData, SignUpResponse } from "../Types/SignUp.type";
import { LogoutResponse } from "../Types/LogoutResponse";
import { UserResponse } from "../Types/User.types";
import { CartResponse, Product } from "../Types/Cart.types";
import { OrderFormData, OrderResponse } from "../Types/Order.types";

const API_BASE_URL1 = "http://localhost:8000/api/v1"


const apiClient = axios.create({
    baseURL: API_BASE_URL1,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

export const handleApiError = async (error: ApiError) => {
    if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Something went wrong")
    }
    throw new Error("Unknown error occured")
}


export const loginApi = async (userData: UserData): Promise<SignInResponse> => {
    try {
        const response = await apiClient.post<SignInResponse>('/auth/login', userData)
        return response.data
    } catch (error) {
        throw await handleApiError(error as ApiError)
    }
}

export const registerApi = async (userData: SignUpData): Promise<SignUpResponse> => {
    try {
        const response = await apiClient.post<SignUpResponse>("auth/register", userData)
        return response.data
    } catch (error) {
        throw await handleApiError(error as ApiError)
    }

}

export const logoutApi = async (token: string): Promise<LogoutResponse> => {
    try {
        const response = await apiClient.post("/auth/logout", {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error) {
        throw await handleApiError(error as ApiError)
    }
}

export const userApi = async (): Promise<UserResponse> => {
    try {
        const response = await apiClient.get("/auth/user")
        return response.data;
    } catch (error) {
        throw await handleApiError(error as ApiError)
    }
}

// Cart API

export const addToCartApi = async (token: String, product: Product, quantity: Number):Promise<CartResponse> => {
    try {
        const response = await axios.post(
            `${API_BASE_URL1}/cart/add`,
            { product, quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw await handleApiError(error as ApiError)
    }
};

export const updateCartItemApi = async (token: String, itemId:string, quantity: number):Promise<CartResponse> => {
    try {
        const response = await axios.put(
            `${API_BASE_URL1}/cart/update/${itemId}`,
            { quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw await handleApiError(error as ApiError)
    }
};

export const removeFromCartApi = async (token: String, itemId:string):Promise<CartResponse> => {
    try {
        const response = await axios.delete(
            `${API_BASE_URL1}/cart/remove/${itemId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw await handleApiError(error as ApiError)
    }
};

export const fetchCartApi = async (token: String):Promise<CartResponse> => {
    try {
        const response = await axios.get(
            `${API_BASE_URL1}/cart`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw await handleApiError(error as ApiError)
    }
};

// Order API

export const placeOrder = async (token: String, orderData:OrderFormData):Promise<OrderResponse> => {
    try {
        const response = await axios.post(
            `${API_BASE_URL1}/order/checkout`,
            { orderData },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw await handleApiError(error as ApiError)
    }
};

//Payment Api









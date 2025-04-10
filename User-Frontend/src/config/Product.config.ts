import axios from "axios";
import { handleApiError } from "./Api.config";
import { ProductResponse, ApiError } from "../Types/Product.types";



const API_BASE_URL2 = "http://localhost:13374/api"


const apiClient = axios.create({
    baseURL:API_BASE_URL2,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
})


export const fetchProductsApi = async():Promise<ProductResponse>=>{
    try {
        const response = await apiClient.get(`/products?populate=*`)
        return response.data;
    } catch (error) {
        throw await handleApiError(error as ApiError)
    }
}
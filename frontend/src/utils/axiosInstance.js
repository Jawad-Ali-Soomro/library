import { SERVER_URL } from "@/constants/constant";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: SERVER_URL, 
    timeout: 10000, 
});
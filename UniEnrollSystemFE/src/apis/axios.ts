import axios from "axios";
import apiURL from "../config/config";
import { getAccessToken } from "../utils/auth";

export default axios.create({
    baseURL: apiURL,
});
export const axiosPrivate = axios.create({
    baseURL: apiURL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosPrivate.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

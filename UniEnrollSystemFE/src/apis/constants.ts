import apiURL from "../config/config";
import LoginResponse, { ILogin } from "../types/studentType";
import axios from "./axios";

const login = async (data: ILogin) => {
    const response = await axios.post<LoginResponse>(`${apiURL}/auth/login`, {
        username: data.id,
        password: data.password,
    });
    return response.data;
};

const refreshToken = async (refreshToken: string) => {
    const response = await axios.post<LoginResponse>(
        `${apiURL}/auth/refresh-token`,
        {
            refreshToken,
        }
    );
    return response.data;
};

export const UniEnrollSystemAPI = {
    login,
    refreshToken,
};

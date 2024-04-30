import apiURL from "../config/config";
import CourseRegistrationResponse from "../types/courseType";
import EducationProgramsResponse from "../types/educationProgramType";
import LoginResponse, { ILogin } from "../types/studentType";
import axios, { axiosPrivate } from "./axios";

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
            refreshToken: refreshToken,
        }
    );
    return response.data;
};

const getEducationPrograms = async () => {
    const response = await axiosPrivate.get<EducationProgramsResponse>(
        `${apiURL}/courses`
    );
    return response.data;
};

const getCourseRegistration = async (semester: number, year: number) => {
    const response = await axiosPrivate.get<CourseRegistrationResponse>(
        `${apiURL}/classes?semester=${semester}&year=${year}`
    );
    return response.data;
};

export const UniEnrollSystemAPI = {
    login,
    refreshToken,
    getEducationPrograms,
    getCourseRegistration,
};

import apiURL from "../config/config";
import ClassesEnrolledResponse, {
    RemoveClassesEnrolled,
} from "../types/classesEnrolledType";
import CourseRegistrationResponse from "../types/courseType";
import EducationProgramsResponse from "../types/educationProgramType";
import ClassScheduleResponse from "../types/scheduleType";
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
        `${apiURL}/classes/registrable?semester=${semester}&year=${year}`
    );
    return response.data;
};

const getClassSchedule = async (classId: string) => {
    const response = await axiosPrivate.get<ClassScheduleResponse>(
        `${apiURL}/schedules/classes/${classId}`
    );
    return response.data;
};

const getClassesEnrolled = async (semester: number, year: number) => {
    const response = await axiosPrivate.get<ClassesEnrolledResponse>(
        `${apiURL}/enrollments/registry?semester=${semester}&year=${year}`
    );
    return response.data;
};

const classesEnrolled = async (id: string, groupId: number) => {
    const response = await axiosPrivate.post<ClassScheduleResponse>(
        `${apiURL}/enrollments/register`,
        {
            class_id: id,
            group: groupId,
        }
    );
    return response.data;
};

const removeClassesEnrolled = async (id: string) => {
    const response = await axiosPrivate.delete<RemoveClassesEnrolled>(
        `${apiURL}/enrollments/cancel?class_id=${id}`
    );
    return response.data;
};

const changeClassesEnrolled = async (
    old_class_id: string,
    new_class_id: string,
    group: number
) => {
    const response = await axiosPrivate.post<RemoveClassesEnrolled>(
        `${apiURL}/enrollments/register/change`,
        {
            old_class_id: old_class_id,
            new_class_id: new_class_id,
            group: group,
        }
    );
    return response.data;
};

export const UniEnrollSystemAPI = {
    login,
    refreshToken,
    getEducationPrograms,
    getCourseRegistration,
    getClassSchedule,
    getClassesEnrolled,
    classesEnrolled,
    removeClassesEnrolled,
    changeClassesEnrolled,
};

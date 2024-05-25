import ClassesEnrolledResponse, {
    RemoveClassesEnrolled,
} from "../types/classesEnrolledType";
import {
    ILearnedCreditResponse,
    IScholarShipResponse,
    IStatisticsReport,
    IWaitListResponse,
    IWaitingCourseResponse,
} from "../types/commonType";
import CourseRegistrationResponse from "../types/courseType";
import DebtResponse, { DebtBySemesterResponse } from "../types/debtTypes";
import EducationProgramsResponse from "../types/educationProgramType";
import ReceiptResponse from "../types/receiptType";
import ClassScheduleResponse from "../types/scheduleType";
import LoginResponse, { ILogin } from "../types/studentType";
import StudyResultsResponse, {
    StudyResultResponse,
} from "../types/studyResultType";
import StudyScheduleResponse from "../types/studyScheduleType";
import axios, { axiosPrivate } from "./axios";

const login = async (data: ILogin) => {
    const response = await axios.post<LoginResponse>(`/auth/login`, {
        username: data.id,
        password: data.password,
    });
    return response.data;
};

const refreshToken = async (refreshToken: string) => {
    const response = await axios.post<LoginResponse>(
        `/auth/refresh-token`,
        {
            refreshToken: refreshToken,
        },
        {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        }
    );
    return response.data;
};

const logout = async (accessToken: string, refreshToken: string) => {
    const response = await axiosPrivate.post(`/auth/logout`, {
        accessToken: accessToken,
        refreshToken: refreshToken,
    });
    return response.data;
};

const getEducationPrograms = async () => {
    const response = await axiosPrivate.get<EducationProgramsResponse>(
        `/courses`
    );
    return response.data;
};

const getCourseRegistration = async (semester: number, year: number) => {
    const response = await axiosPrivate.get<CourseRegistrationResponse>(
        `/classes/registrable?semester=${semester}&year=${year}`
    );
    return response.data;
};

const getClassSchedule = async (classId: string) => {
    const response = await axiosPrivate.get<ClassScheduleResponse>(
        `/schedules/classes/${classId}`
    );
    return response.data;
};

const getClassesEnrolled = async (semester: number, year: number) => {
    const response = await axiosPrivate.get<ClassesEnrolledResponse>(
        `/enrollments/registry?semester=${semester}&year=${year}`
    );
    return response.data;
};

const classesEnrolled = async (id: string, groupId: number) => {
    const response = await axiosPrivate.post<ClassScheduleResponse>(
        `/enrollments/register`,
        {
            class_id: id,
            group: groupId,
        }
    );
    return response.data;
};

const removeClassesEnrolled = async (id: string) => {
    const response = await axiosPrivate.delete<RemoveClassesEnrolled>(
        `/enrollments/cancel?class_id=${id}`
    );
    return response.data;
};

const changeClassesEnrolled = async (
    old_class_id: string,
    new_class_id: string,
    group: number
) => {
    const response = await axiosPrivate.post<RemoveClassesEnrolled>(
        `/enrollments/register/change`,
        {
            old_class_id: old_class_id,
            new_class_id: new_class_id,
            group: group,
        }
    );
    return response.data;
};

const getStudentSchedule = async (day: number, month: number, year: number) => {
    const response = await axiosPrivate.get<StudyScheduleResponse>(
        "/schedules/classes/by-date",
        {
            params: {
                day: day,
                month: month,
                year: year,
            },
        }
    );
    return response.data;
};

const getStudyResults = async () => {
    const response = await axiosPrivate.get<StudyResultsResponse>(
        "/semester-report/summaries"
    );
    return response.data;
};

const getStudyResultBySemester = async (semester: number, year: number) => {
    const response = await axiosPrivate.get<StudyResultResponse>(
        `/semester-report/summary?semester=${semester}&year=${year}`
    );
    return response.data;
};

const getPredictScholarship = async (
    semester: number,
    year: number,
    gpa: number
) => {
    const response = await axiosPrivate.get<IScholarShipResponse>(
        `/semester-report/estimate/scholarship?semester=${semester}&year=${year}&gpa=${gpa}`
    );
    return response.data;
};

const getStatisticsBySemester = async (semester: number, year: number) => {
    const response = await axiosPrivate.get<IStatisticsReport>(
        `/semester-report/statistics?semester=${semester}&year=${year}`
    );
    return response.data;
};

const getStudentDebt = async (page: number, size: number) => {
    const response = await axiosPrivate.get<DebtResponse>(
        `/course-payments/page?page=${page}&size=${size}`
    );
    return response.data;
};

const getStudentDeptBySemester = async (semester: number, year: number) => {
    const response = await axiosPrivate.get<DebtBySemesterResponse>(
        `/course-payments/by-semester?semester=${semester}&year=${year}`
    );
    return response.data;
};

const createPayment = async (amount: number, class_ids: string[]) => {
    const response = await axiosPrivate.post("/payments/create_payment", {
        amount: amount,
        class_ids: class_ids,
    });
    return response.data;
};

const checkPayment = async (param: string) => {
    const response = await axiosPrivate.post(
        `/payments/payment_callback?${param}`
    );
    return response.data;
};

const registrationToWaitingList = async (
    courseId: string,
    semester: number,
    year: number
) => {
    const response = await axiosPrivate.post<IWaitListResponse>(
        `/wait-list/register`,
        {
            courseId: courseId,
            semester: semester,
            year: year,
        }
    );
    return response.data;
};

const getWaitingCourses = async (semester: number, year: number) => {
    const response = await axiosPrivate.get<IWaitingCourseResponse>(
        `/wait-list?semester=${semester}&year=${year}`
    );
    return response.data;
};

const getLearnedCredit = async () => {
    const response = await axiosPrivate.get<ILearnedCreditResponse>(
        `/semester-report/credits`
    );
    return response.data;
};

const getReceipts = async (page: number, size: number) => {
    const response = await axiosPrivate.get<ReceiptResponse>(
        `/invoices?page=${page}&size=${size}`
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
    getStudentSchedule,
    getStudyResults,
    getStudyResultBySemester,
    getPredictScholarship,
    getStatisticsBySemester,
    getStudentDebt,
    createPayment,
    checkPayment,
    getStudentDeptBySemester,
    registrationToWaitingList,
    getWaitingCourses,
    logout,
    getLearnedCredit,
    getReceipts,
};

interface ILogin {
    id: string;
    password: string;
}
interface IStudent {
    id: string;
    name: string;
    majorId: number;
    majorName: string;
    year: number;
    facultyId: number;
    facultyName: string;
}

interface ILoginResponseData {
    student: IStudent;
    accessToken: string;
    refreshToken: string;
}

type LoginResponse = {
    message: string;
    data: ILoginResponseData;
    status: number;
};

export default LoginResponse;

export type { IStudent, ILogin };

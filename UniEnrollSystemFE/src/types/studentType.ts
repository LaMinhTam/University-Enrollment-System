interface IStudent {
    id: string;
    name: string;
    majorId: number;
    majorName: string;
    year: number;
    facultyId: number;
    facultyName: string;
}

interface IToken {
    accessToken: string;
    refreshToken: string;
}

type LoginData = {
    student: IStudent;
    token: IToken;
};

export default LoginData;

export type { IStudent, IToken };

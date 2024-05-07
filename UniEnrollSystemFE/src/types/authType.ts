import { IStudent } from "./studentType";

interface IAuthValues {
    id: string;
    password: string;
}

type AuthType = {
    values: IAuthValues;
    userInfo: IStudent;
    setValues: (values: IAuthValues) => void;
    setUserInfo: (userInfo: IStudent) => void;
};

export default AuthType;
export type { IAuthValues };

import { IStudent } from "./studentType";

interface IAuthValues {
    id: string;
    password: string;
}

type AuthType = {
    values: IAuthValues;
    userInfo: IStudent | null;
};

export default AuthType;
export type { IAuthValues };

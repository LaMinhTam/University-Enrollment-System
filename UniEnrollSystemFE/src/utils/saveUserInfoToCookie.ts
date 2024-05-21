import { IStudent } from "../types/studentType";
import { saveUser } from "./auth";
import CryptoJS from "crypto-js";

export default function saveUserInfoToCookie(
    student: IStudent,
    accessToken: string
) {
    const cipherText = CryptoJS.AES.encrypt(
        JSON.stringify(student),
        accessToken
    ).toString();
    saveUser(cipherText);
}

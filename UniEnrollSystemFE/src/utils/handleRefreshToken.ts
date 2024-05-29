import { toast } from "react-toastify";
import { UniEnrollSystemAPI } from "../apis/constants";
import { saveAccessToken, saveRefreshToken, saveUser } from "./auth";
import { NavigateFunction } from "react-router-dom";
import saveUserInfoToCookie from "./saveUserInfoToCookie";

export default async function handleRefreshToken(
    refreshToken: string,
    navigate: NavigateFunction
) {
    try {
        const response = await UniEnrollSystemAPI.refreshToken(refreshToken);
        console.log("response:", response);
        if (response.status === 200) {
            saveAccessToken(response.data.accessToken);
            saveRefreshToken(response.data.refreshToken);
            saveUserInfoToCookie(
                response.data.student,
                response.data.accessToken
            );
        }
    } catch (error) {
        saveAccessToken("");
        saveRefreshToken("");
        saveUser("");
        toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
        navigate("/dang-nhap");
    }
}

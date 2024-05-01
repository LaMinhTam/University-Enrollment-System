import { useEffect } from "react";
import {
    getAccessToken,
    getRefreshToken,
    saveAccessToken,
    saveRefreshToken,
    saveUser,
} from "../utils/auth";
import isTokenExpire from "../utils/isTokenExpire";
import { useNavigate } from "react-router-dom";
import { UniEnrollSystemAPI } from "../apis/constants";
import { toast } from "react-toastify";

const RequiredAuthPage = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const accessToken = getAccessToken() ?? "";
    const refreshToken = getRefreshToken() ?? "";
    const isAccessTokenExpired = isTokenExpire(accessToken);
    const isRefreshTokenExpired = isTokenExpire(refreshToken);
    useEffect(() => {
        async function handleRefreshToken() {
            try {
                const response = await UniEnrollSystemAPI.refreshToken(
                    refreshToken
                );
                if (response.status === 200) {
                    console.log("Refresh token success");
                    saveAccessToken(response.data.accessToken);
                    saveRefreshToken(response.data.refreshToken);
                }
            } catch (error) {
                saveAccessToken("");
                saveRefreshToken("");
                saveUser("");
                toast.error(
                    "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại"
                );
                navigate("/dang-nhap");
            }
        }
        if (isAccessTokenExpired && !isRefreshTokenExpired) {
            console.log("Access token expired");
            handleRefreshToken();
        } else if (!isAccessTokenExpired) {
            return;
        } else {
            saveAccessToken("");
            saveRefreshToken("");
            navigate("/dang-nhap");
        }
    }, [isAccessTokenExpired, isRefreshTokenExpired, navigate, refreshToken]);
    return <>{children}</>;
};

export default RequiredAuthPage;

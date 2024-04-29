import { useEffect } from "react";
import {
    getAccessToken,
    getRefreshToken,
    saveAccessToken,
    saveRefreshToken,
} from "../utils/auth";
import isTokenExpire from "../utils/isTokenExpire";
import { useNavigate } from "react-router-dom";
import { UniEnrollSystemAPI } from "../apis/constants";

const RequiredAuthPage = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const accessToken = getAccessToken() ?? "";
    const refreshToken = getRefreshToken() ?? "";
    const isAccessTokenExpired = isTokenExpire(accessToken);
    const isRefreshTokenExpired = isTokenExpire(refreshToken);

    useEffect(() => {
        async function handleRefreshToken() {
            const response = await UniEnrollSystemAPI.refreshToken(
                refreshToken
            );
            console.log("handleRefreshToken ~ response:", response);
            saveAccessToken(response.data.accessToken);
            saveRefreshToken(response.data.refreshToken);
        }
        if (isAccessTokenExpired && !isRefreshTokenExpired) {
            handleRefreshToken();
        } else if (!isAccessTokenExpired) {
            return;
        } else {
            navigate("/dang-nhap");
        }
    }, [isAccessTokenExpired, isRefreshTokenExpired, navigate, refreshToken]);
    return <>{children}</>;
};

export default RequiredAuthPage;

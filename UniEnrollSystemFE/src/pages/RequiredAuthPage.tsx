import { useEffect } from "react";
import {
    getAccessToken,
    getRefreshToken,
    saveAccessToken,
    saveRefreshToken,
} from "../utils/auth";
import isTokenExpire from "../utils/isTokenExpire";
import { useNavigate } from "react-router-dom";
import createRefreshTokenHandler from "../utils/createRefreshTokenHandler";

const RequiredAuthPage = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const accessToken = getAccessToken() ?? "";
    const refreshToken = getRefreshToken() ?? "";
    const isAccessTokenExpired = isTokenExpire(accessToken);
    const refreshTokenHandler = createRefreshTokenHandler();
    useEffect(() => {
        const isRefreshTokenExpired = isTokenExpire(refreshToken);
        async function handleExpiredToken() {
            if (isAccessTokenExpired && !isRefreshTokenExpired) {
                console.log("Access token expired");
                refreshTokenHandler(navigate);
            } else if (!isAccessTokenExpired) {
                return;
            } else {
                saveAccessToken("");
                saveRefreshToken("");
                navigate("/dang-nhap");
            }
        }
        handleExpiredToken();
    }, [isAccessTokenExpired, navigate, refreshToken, refreshTokenHandler]);
    return <>{children}</>;
};

export default RequiredAuthPage;

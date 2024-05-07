import { NavigateFunction } from "react-router-dom";
import { getRefreshToken } from "./auth";
import handleRefreshToken from "./handleRefreshToken";

export default function createRefreshTokenHandler() {
    let isRefreshingToken = false;
    const refreshTokenHandler = async (navigate: NavigateFunction) => {
        if (isRefreshingToken) {
            return new Promise<void>((resolve) => {
                const interval = setInterval(() => {
                    if (!isRefreshingToken) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 100);
            });
        }
        isRefreshingToken = true;
        const refreshToken = getRefreshToken() ?? "";
        try {
            await handleRefreshToken(refreshToken, navigate);
        } finally {
            isRefreshingToken = false;
        }
    };
    return refreshTokenHandler;
}

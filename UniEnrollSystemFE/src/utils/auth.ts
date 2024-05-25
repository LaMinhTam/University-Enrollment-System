import Cookies from "js-cookie";

const accessTokenKey = "UNI_ENROLL_SYSTEM_ACCESS_TOKEN";
const refreshTokenKey = "UNI_ENROLL_SYSTEM_REFRESH_TOKEN";
const user = "UNI_ENROLL_SYSTEM_USER";
const paymentInfo = "UNI_ENROLL_SYSTEM_PAYMENT_INFO";

const objCookies = {
    expires: 30,
    domain: window.location.hostname,
};

export const saveAccessToken = (access_token: string) => {
    if (access_token) {
        Cookies.set(accessTokenKey, access_token, {
            ...objCookies,
        });
    } else {
        Cookies.remove(accessTokenKey, {
            ...objCookies,
            path: "/",
            domain: window.location.hostname,
        });
    }
};

export const saveRefreshToken = (refresh_token: string) => {
    if (refresh_token) {
        Cookies.set(refreshTokenKey, refresh_token, {
            ...objCookies,
        });
    } else {
        Cookies.remove(refreshTokenKey, {
            ...objCookies,
            path: "/",
            domain: window.location.hostname,
        });
    }
};

export const saveUser = (id: string) => {
    if (id) {
        Cookies.set(user, id, {
            ...objCookies,
        });
    } else {
        Cookies.remove(user, {
            ...objCookies,
            path: "/",
            domain: window.location.hostname,
        });
    }
};

export const savePaymentInfo = (info: string) => {
    if (info) {
        Cookies.set(paymentInfo, info, {
            ...objCookies,
        });
    } else {
        Cookies.remove(paymentInfo, {
            ...objCookies,
            path: "/",
            domain: window.location.hostname,
        });
    }
};

export const getAccessToken = () => {
    const access_token = Cookies.get(accessTokenKey);
    return access_token;
};

export const getRefreshToken = () => {
    const refresh_token = Cookies.get(refreshTokenKey);
    return refresh_token;
};

export const getUser = () => {
    const id = Cookies.get(user);
    return id;
};

export const getPaymentInfo = () => {
    const info = Cookies.get(paymentInfo);
    const parsedInfo = info ? JSON.parse(info) : null;
    return parsedInfo;
};

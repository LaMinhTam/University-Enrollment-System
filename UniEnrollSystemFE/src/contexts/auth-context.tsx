import React, { useEffect } from "react";
import { JSX } from "react/jsx-runtime";
import AuthType, { IAuthValues } from "../types/authType";
import { IStudent } from "../types/studentType";
import CryptoJS from "crypto-js";
import { getAccessToken, getUser } from "../utils/auth";

const AuthContext = React.createContext<AuthType>({} as AuthType);

export function AuthProvider(
    props: JSX.IntrinsicAttributes & React.ProviderProps<AuthType>
) {
    const [values, setValues] = React.useState<IAuthValues>({
        id: "",
        password: "",
    });
    const [userInfo, setUserInfo] = React.useState<IStudent>({
        id: "",
        name: "",
        majorId: 0,
        majorName: "",
        year: 0,
        facultyId: 0,
        facultyName: "",
    });

    useEffect(() => {
        const encryptedUser = getUser();
        const accessToken = getAccessToken();

        if (encryptedUser && accessToken) {
            // Decrypt the data
            const bytes = CryptoJS.AES.decrypt(encryptedUser, accessToken);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            setUserInfo(decryptedData);
        }
    }, []);

    const contextValues = {
        values,
        userInfo,
        setValues,
        setUserInfo,
    };
    return (
        <AuthContext.Provider
            {...props}
            value={contextValues}
        ></AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = React.useContext(AuthContext);
    if (typeof context === "undefined")
        throw new Error("useAuth must be used within AuthProvider");
    return context;
}

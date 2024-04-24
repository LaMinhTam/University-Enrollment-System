import React from "react";
import { JSX } from "react/jsx-runtime";
import AuthType, { IAuthValues } from "../types/authType";
import { IStudent, IToken } from "../types/studentType";

const AuthContext = React.createContext<AuthType | null>(null);

export function AuthProvider(
    props: JSX.IntrinsicAttributes & React.ProviderProps<AuthType | null>
) {
    const [values, setValues] = React.useState<IAuthValues>({
        id: "",
        password: "",
    });
    const [userInfo, setUserInfo] = React.useState<IStudent | null>(null);
    const [token, setToken] = React.useState<IToken | null>(null);
    const contextValues = {
        values,
        userInfo,
        setValues,
        setUserInfo,
        token,
        setToken,
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

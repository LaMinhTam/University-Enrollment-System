import Input from "../components/input";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormGroup } from "../components/common";
import Button from "../components/button";
import { ILogin } from "../types/studentType";
import { UniEnrollSystemAPI } from "../apis/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    getAccessToken,
    saveAccessToken,
    saveRefreshToken,
} from "../utils/auth";
import { useEffect } from "react";
import { useAuth } from "../contexts/auth-context";
import isTokenExpire from "../utils/isTokenExpire";
import saveUserInfoToCookie from "../utils/saveUserInfoToCookie";

const schema = yup.object().shape({
    id: yup
        .string()
        .matches(
            /^(18|19|20|21|22|23|24)\d{6}$/,
            "Mã sinh viên phải bao gồm 8 số"
        )
        .required("Trường này không được để trống"),
    password: yup
        .string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        //     {
        //         message:
        //             "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
        //     }
        // )
        .required("Trường này không được để trống"),
});
const LoginPage = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();
    const accessToken = getAccessToken();

    const { setUserInfo } = useAuth();

    const handleSignIn = async (data: ILogin) => {
        if (!isValid) return;
        try {
            const response = await UniEnrollSystemAPI.login(data);
            if (response.status === 200) {
                toast.success(response.message);
                saveAccessToken(response.data.accessToken);
                saveRefreshToken(response.data.refreshToken);
                setUserInfo(response.data.student);
                // Encrypt the student data
                saveUserInfoToCookie(
                    response.data.student,
                    response.data.accessToken
                );
                navigate("/");
            }
        } catch (error) {
            toast.error("Sai tên đăng nhập hoặc mật khẩu");
        }
    };

    useEffect(() => {
        if (!isTokenExpire(accessToken ?? "")) {
            navigate("/");
        } else {
            return;
        }
    }, [accessToken, navigate]);

    return (
        <div className="w-full h-screen bg-strock">
            <div className="flex items-center justify-center w-full py-3 mb-10 shadow-md bg-lite">
                <img src="./login-banner.png" alt="" />
            </div>
            <div className="flex items-center justify-center md:gap-x-10">
                <img
                    srcSet={"login-bg.svg"}
                    alt="UniEnrollSystem"
                    className="hidden md:block"
                />
                <form
                    onSubmit={handleSubmit(handleSignIn)}
                    autoComplete="off"
                    className="p-10 rounded-lg bg-lite max-w-[368px] h-full"
                >
                    <FormGroup>
                        <p className="text-xl font-semibold text-center text-primary">
                            Cổng thông tin sinh viên
                        </p>
                        <h1 className="text-xl font-semibold text-center text-primary">
                            Đăng nhập hệ thống
                        </h1>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            name="id"
                            control={control}
                            placeholder="Mã sinh viên"
                            type="text"
                        />
                        <span className="text-sm font-medium pointer-events-none text-error text-wrap">
                            {errors.id?.message}
                        </span>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            name="password"
                            control={control}
                            placeholder="Mật khẩu"
                            type="password"
                        />
                        <span className="text-sm font-medium pointer-events-none text-error text-wrap">
                            {errors.password?.message}
                        </span>
                    </FormGroup>
                    <FormGroup>
                        <Button
                            kind="primary"
                            type="submit"
                            isLoading={isSubmitting}
                        >
                            Đăng nhập
                        </Button>
                    </FormGroup>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

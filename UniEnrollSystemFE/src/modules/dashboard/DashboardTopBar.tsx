import { Link, useNavigate } from "react-router-dom";
import DashboardSearch from "./DashboardSearch";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useClickOutSide from "../../hooks/useClickOutSide";
import {
    getAccessToken,
    getRefreshToken,
    saveAccessToken,
    saveRefreshToken,
} from "../../utils/auth";
import { useAuth } from "../../contexts/auth-context";
import { defaultImage } from "../../constants/global";
import { useState } from "react";
import { UniEnrollSystemAPI } from "../../apis/constants";
import { Loading } from "../../components/common";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../../store/actions/commonSlice";
const DashboardTopBar = () => {
    const dispatch = useDispatch();
    const { show: showInfo, setShow: setShowInfo, nodeRef } = useClickOutSide();
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const handleLogout = async () => {
        try {
            const response = await UniEnrollSystemAPI.logout(
                accessToken ?? "",
                refreshToken ?? ""
            );
            if (response.status === 200) {
                saveAccessToken("");
                saveRefreshToken("");
                navigate("/dang-nhap");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <div className="md:max-w-[1140px] md:mx-auto">
            <div className="flex items-center justify-center">
                <div className="flex items-center flex-1 mt-2 md:mt-0 md:gap-x-10">
                    <Link to={"/"} className="inline-block">
                        <img
                            srcSet="/logo.png 2x"
                            alt="iuh-app"
                            className="h-[40px] w-full object-cover"
                        />
                    </Link>
                    <div className="max-w-[458px] md:block w-full hidden">
                        <DashboardSearch></DashboardSearch>
                    </div>
                    <div className="flex items-center justify-end flex-1 ml-20 md:gap-x-10 gap-x-2">
                        <button className="items-center justify-center hidden text-sm font-normal md:flex">
                            <HomeIcon />
                            <span>Trang chủ</span>
                        </button>
                        <button className="items-center justify-center hidden text-sm font-normal md:flex">
                            <NotificationsNoneIcon />
                            <span>Tin tức</span>
                        </button>
                        <button
                            className="relative flex items-center justify-center text-sm font-medium gap-x-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowInfo(true);
                            }}
                        >
                            <div className="w-8 h-8 rounded-full">
                                <img
                                    className="object-cover w-full h-full rounded-full"
                                    src={defaultImage}
                                    alt="User avatar"
                                />
                            </div>
                            <div>
                                <span>{userInfo.name}</span>
                                <ExpandMoreIcon />
                            </div>
                            {showInfo && (
                                <div
                                    className="absolute top-[60px] bg-text8 shadow-md"
                                    ref={nodeRef}
                                >
                                    <div className="w-[180px] h-full flex flex-col">
                                        <Link
                                            className="px-[15px] py-[10px] hover:text-primary 
                                        hover:font-medium hover:bg-text6"
                                            to={"/thong-tin-sinh-vien"}
                                        >
                                            Thông tin cá nhân
                                        </Link>
                                        <Link
                                            className="px-[15px] py-[10px] border-y border-y-text4 
                                        hover:text-primary hover:font-medium hover:bg-text6"
                                            to={"/doi-mat-khau"}
                                        >
                                            Đổi mật khẩu
                                        </Link>
                                        <button
                                            disabled={loading}
                                            className="px-[15px] py-[10px] hover:text-primary 
                                        hover:font-medium hover:bg-text6"
                                            onClick={handleLogout}
                                        >
                                            {loading ? (
                                                <Loading />
                                            ) : (
                                                "Đăng xuất"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </button>
                        <button
                            onClick={() => dispatch(toggleSideBar())}
                            className="flex items-center justify-center md:hidden"
                        >
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTopBar;

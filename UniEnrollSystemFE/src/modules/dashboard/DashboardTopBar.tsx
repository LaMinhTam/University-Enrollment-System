import { Link } from "react-router-dom";
import DashboardSearch from "./DashboardSearch";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useClickOutSide from "../../hooks/useClickOutSide";
import { saveAccessToken, saveRefreshToken } from "../../utils/auth";
import { useAuth } from "../../contexts/auth-context";
const DashboardTopBar = () => {
    const { show: showInfo, setShow: setShowInfo, nodeRef } = useClickOutSide();
    const { userInfo } = useAuth();
    return (
        <div className="max-w-[1140px] mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 gap-x-10">
                    <Link to={"/"} className="inline-block">
                        <img
                            srcSet="/logo.png 2x"
                            alt="iuh-app"
                            className="h-[40px] w-full object-cover"
                        />
                    </Link>
                    <div className="max-w-[458px] w-full">
                        <DashboardSearch></DashboardSearch>
                    </div>
                    <div className="flex items-center justify-end flex-1 gap-x-10">
                        <button className="flex items-center justify-center text-sm font-normal">
                            <HomeIcon />
                            <span>Trang chủ</span>
                        </button>
                        <button className="flex items-center justify-center text-sm font-normal">
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
                                    src={"https://source.unsplash.com/random"}
                                    alt="User avatar"
                                />
                            </div>
                            <div>
                                <span>{userInfo.name}</span>
                                <ExpandMoreIcon />
                            </div>
                            {showInfo && (
                                <div
                                    className="absolute top-[60px] bg-lite"
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
                                        <Link
                                            className="px-[15px] py-[10px] hover:text-primary 
                                        hover:font-medium hover:bg-text6"
                                            to={"/dang-nhap"}
                                            onClick={() => {
                                                saveAccessToken("");
                                                saveRefreshToken("");
                                            }}
                                        >
                                            Đăng xuất
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTopBar;

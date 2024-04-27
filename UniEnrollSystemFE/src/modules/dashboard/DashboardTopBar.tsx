import { Link } from "react-router-dom";
import DashboardSearch from "./DashboardSearch";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const DashboardTopBar = () => {
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
                        <button className="flex items-center justify-center text-sm font-medium gap-x-2">
                            <div className="w-8 h-8 rounded-full">
                                <img
                                    className="object-cover w-full h-full rounded-full"
                                    src={"https://source.unsplash.com/random"}
                                    alt="User avatar"
                                />
                            </div>
                            <div>
                                <span>Vo Dinh Thong</span>
                                <ExpandMoreIcon />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTopBar;

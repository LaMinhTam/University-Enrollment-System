import { Outlet } from "react-router-dom";
import DashboardTopBar from "../modules/dashboard/DashboardTopBar";
import DashboardSidebar from "../modules/dashboard/DashboardSidebar";
import { Overlay } from "../components/common";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import { useState } from "react";

const LayoutDashboard = () => {
    const [showSidebar, setShowSidebar] = useState<boolean>(true);
    return (
        <div className="min-h-screen bg-strock">
            <Overlay></Overlay>
            <div className="w-full h-[60px] mx-auto shadow-md bg-lite fixed top-0 left-0 right-0">
                <DashboardTopBar></DashboardTopBar>
            </div>
            <div className="absolute z-50 mt-[60px]">
                <div className="flex items-start justify-start">
                    {showSidebar && <DashboardSidebar></DashboardSidebar>}
                    <button
                        className="w-10 h-10 mt-2 ml-2 rounded bg-tertiary text-lite"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        <OpenWithIcon />
                    </button>
                </div>
            </div>
            <div className="w-full max-w-[1140px] h-full mx-auto pt-[60px]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default LayoutDashboard;

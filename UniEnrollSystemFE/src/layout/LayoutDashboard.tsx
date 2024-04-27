import { Outlet } from "react-router-dom";
import Overlay from "../components/common/Overlay";
import DashboardTopBar from "../modules/dashboard/DashboardTopBar";
import DashboardSidebar from "../modules/dashboard/DashboardSidebar";

const LayoutDashboard = () => {
    return (
        <div className="min-h-screen bg-strock">
            <Overlay></Overlay>
            <div className="w-full h-[60px] mx-auto shadow-md bg-lite">
                <DashboardTopBar></DashboardTopBar>
            </div>
            <div className="flex items-start gap-x-10">
                <DashboardSidebar></DashboardSidebar>
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default LayoutDashboard;

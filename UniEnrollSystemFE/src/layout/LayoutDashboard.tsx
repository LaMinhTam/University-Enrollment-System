import { Outlet } from "react-router-dom";
import DashboardTopBar from "../modules/dashboard/DashboardTopBar";
import DashboardSidebar from "../modules/dashboard/DashboardSidebar";
import { Overlay } from "../components/common";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import Modal from "../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { toggleSideBar } from "../store/actions/commonSlice";

const LayoutDashboard = () => {
    const showSideBar = useSelector(
        (state: RootState) => state.common.showSideBar
    );
    const dispatch = useDispatch();
    return (
        <>
            <Modal />
            <div className="h-full md:min-h-screen min-w-fit bg-strock">
                <Overlay></Overlay>
                <div className="w-full h-[60px] mx-auto shadow-md bg-lite fixed top-0 left-0 right-0">
                    <DashboardTopBar></DashboardTopBar>
                </div>
                <div className="z-50 mt-[60px] fixed">
                    <div className="flex items-start justify-start">
                        {showSideBar && <DashboardSidebar></DashboardSidebar>}
                        <button
                            className="hidden w-10 h-10 mt-2 ml-2 rounded bg-tertiary text-lite md:block"
                            onClick={() => dispatch(toggleSideBar())}
                        >
                            <OpenWithIcon />
                        </button>
                    </div>
                </div>
                <div className="w-full h-full pt-[60px]">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default LayoutDashboard;

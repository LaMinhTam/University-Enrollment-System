/* eslint-disable react-refresh/only-export-components */
import { ToastContainer } from "react-toastify";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-datepicker/dist/react-datepicker.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AuthType from "./types/authType.ts";
import store from "./store/configureStore.ts";
import StudyResultPage from "./pages/StudyResultPage.tsx";
import Loading from "./components/common/Loading.tsx";
const LayoutDashboard = React.lazy(
    () => import("./layout/LayoutDashboard.tsx")
);

const DashboardPage = React.lazy(() => import("./pages/DashboardPage.tsx"));
const EducationProgram = React.lazy(
    () => import("./pages/EducationProgram.tsx")
);

const CourseRegisterPage = React.lazy(
    () => import("./pages/CourseRegisterPage.tsx")
);

const StudentSchedulePage = React.lazy(
    () => import("./pages/StudentSchedulePage.tsx")
);

const OnlinePaymentPage = React.lazy(
    () => import("./pages/OnlinePaymentPage.tsx")
);

const StudentDebtPage = React.lazy(() => import("./pages/StudentDebtPage.tsx"));

const router = createBrowserRouter([
    {
        element: <LayoutDashboard />,
        children: [
            {
                path: "/",
                element: <DashboardPage />,
            },
            {
                path: "/chuong-trinh-khung",
                element: <EducationProgram />,
            },
            {
                path: "/dang-ky-hoc-phan",
                element: <CourseRegisterPage />,
            },
            {
                path: "/lich-theo-tuan",
                element: <StudentSchedulePage />,
            },
            {
                path: "/ket-qua-hoc-tap",
                element: <StudyResultPage></StudyResultPage>,
            },
            {
                path: "/thanh-toan-truc-tuyen",
                element: <OnlinePaymentPage></OnlinePaymentPage>,
            },
            {
                path: "/cong-no-sinh-vien",
                element: <StudentDebtPage></StudentDebtPage>,
            },
        ],
    },
    {
        element: <LoginPage></LoginPage>,
        path: "/dang-nhap",
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <AuthProvider value={{} as AuthType}>
            <App>
                <Suspense
                    fallback={
                        <div className="flex items-center justify-center w-full h-screen mx-auto">
                            <Loading />
                        </div>
                    }
                >
                    <RouterProvider router={router}></RouterProvider>
                </Suspense>
            </App>
            <ToastContainer bodyClassName="font-primary text-sm"></ToastContainer>
        </AuthProvider>
    </Provider>
);

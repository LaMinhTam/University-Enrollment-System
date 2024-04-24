/* eslint-disable react-refresh/only-export-components */
import { ToastContainer } from "react-toastify";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context.tsx";
import LoginPage from "./pages/LoginPage.tsx";
const LayoutDashboard = React.lazy(
    () => import("./layout/LayoutDashboard.tsx")
);

const DashboardPage = React.lazy(() => import("./pages/DashboardPage.tsx"));

const router = createBrowserRouter([
    {
        element: <LayoutDashboard />,
        children: [
            {
                path: "/",
                element: <DashboardPage />,
            },
        ],
    },
    {
        element: <LoginPage></LoginPage>,
        path: "/login",
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AuthProvider value={null}>
        <App>
            <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={router}></RouterProvider>
            </Suspense>
        </App>
        <ToastContainer bodyClassName="font-primary text-sm"></ToastContainer>
    </AuthProvider>
);

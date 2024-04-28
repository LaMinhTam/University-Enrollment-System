import { useAuth } from "../contexts/auth-context";
import RequiredAuthPage from "./RequiredAuthPage";

const DashboardPage = () => {
    const { userInfo } = useAuth();
    console.log("DashboardPage ~ userInfo:", userInfo);
    return <RequiredAuthPage>DashboardPage</RequiredAuthPage>;
};

export default DashboardPage;

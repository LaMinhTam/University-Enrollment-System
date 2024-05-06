import { useAuth } from "../contexts/auth-context";
import RequiredAuthPage from "./RequiredAuthPage";
import StudentInfo from "../modules/student/StudentInfo";
import StudentFeature from "../modules/student/StudentFeature";
import StudentChartMetric from "../modules/student/StudentChartMetric";

const DashboardPage = () => {
    const { userInfo } = useAuth();
    return (
        <RequiredAuthPage>
            <StudentInfo userInfo={userInfo} />
            <StudentFeature />
            <StudentChartMetric />
        </RequiredAuthPage>
    );
};

export default DashboardPage;

import { useAuth } from "../contexts/auth-context";
import RequiredAuthPage from "./RequiredAuthPage";
import StudentInfo from "../modules/student/StudentInfo";
import StudentFeature from "../modules/student/StudentFeature";
import StudentChartMetric from "../modules/student/StudentChartMetric";

const DashboardPage = () => {
    const { userInfo } = useAuth();
    return (
        <RequiredAuthPage>
            <div className="w-full max-w-[1140px] mx-auto pb-5">
                <StudentInfo userInfo={userInfo} />
                <StudentFeature />
                <StudentChartMetric />
            </div>
        </RequiredAuthPage>
    );
};

export default DashboardPage;

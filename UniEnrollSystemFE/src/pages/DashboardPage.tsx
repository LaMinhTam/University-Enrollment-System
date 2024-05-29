import { useAuth } from "../contexts/auth-context";
import RequiredAuthPage from "./RequiredAuthPage";
import StudentInfo from "../modules/student/StudentInfo";
import StudentFeature from "../modules/student/StudentFeature";
import StudentChartMetric from "../modules/student/StudentChartMetric";

const DashboardPage = () => {
    const { userInfo } = useAuth();

    return (
        <RequiredAuthPage>
            <div className="w-full h-full max-w-[1140px] mx-auto md:pb-16 px-[15px] py-[10px]">
                <StudentInfo userInfo={userInfo} />
                <StudentFeature />
                <StudentChartMetric />
            </div>
        </RequiredAuthPage>
    );
};

export default DashboardPage;

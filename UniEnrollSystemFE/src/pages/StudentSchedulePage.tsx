import { useLocation } from "react-router-dom";
import Table from "../modules/schedule/Table";
import Header from "../modules/schedule/Header";
import Footer from "../modules/schedule/Footer";
import RequiredAuthPage from "./RequiredAuthPage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { splitDate } from "../utils/formatTime";
import { UniEnrollSystemAPI } from "../apis/constants";
import { toast } from "react-toastify";
import { ScheduleData } from "../types/studyScheduleType";
import { SCHEDULE_TYPE } from "../constants/global";
import handleFilterStudySchedule from "../utils/handleFilterStudySchedule";
import handleFilterExamSchedule from "../utils/handleFilterExamSchedule";
import { setScheduleType } from "../store/actions/scheduleSlice";
const StudentSchedulePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    const targetDate = useSelector(
        (state: RootState) => state.schedule.targetDate
    );
    const [loading, setLoading] = useState<boolean>(false);

    const [schedules, setSchedules] = useState<ScheduleData[]>([]);
    const scheduleType = useSelector(
        (state: RootState) => state.schedule.scheduleType
    );

    useEffect(() => {
        document.title = "Lịch học, lịch thi tuần";
        dispatch(setScheduleType(Number(type)));
    }, [dispatch, type]);

    useEffect(() => {
        async function fetchStudentSchedule() {
            try {
                setLoading(true);
                const date = splitDate(targetDate);
                const response = await UniEnrollSystemAPI.getStudentSchedule(
                    date.day,
                    date.month,
                    date.year
                );
                if (response.status === 200) {
                    if (scheduleType === SCHEDULE_TYPE.ALL) {
                        setSchedules(response.data);
                    } else if (scheduleType === SCHEDULE_TYPE.STUDY) {
                        const schedules = handleFilterStudySchedule(
                            response.data
                        );
                        setSchedules(schedules);
                    } else if (scheduleType === SCHEDULE_TYPE.EXAM) {
                        const schedules = handleFilterExamSchedule(
                            response.data
                        );
                        setSchedules(schedules);
                    } else {
                        toast.info("Lịch học không tồn tại!!!");
                    }
                    setLoading(false);
                }
            } catch (error) {
                toast.error("Lỗi khi lấy dữ liệu lịch học của sinh viên!");
            }
        }

        if (targetDate && scheduleType) {
            fetchStudentSchedule();
        }
    }, [scheduleType, targetDate]);

    return (
        <RequiredAuthPage>
            <div className="w-full h-full p-3 mt-5 shadow-md select-none bg-lite max-w-[1140px] mx-auto">
                <Header />
                {!loading ? (
                    <>
                        <Table schedules={schedules} />
                        <Footer />
                    </>
                ) : (
                    <div className="flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-gray-300 rounded-full animate-spin border-t-tertiary"></div>
                    </div>
                )}
            </div>
        </RequiredAuthPage>
    );
};

export default StudentSchedulePage;

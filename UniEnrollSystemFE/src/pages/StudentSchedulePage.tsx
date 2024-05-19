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
import { setScheduleType } from "../store/actions/scheduleSlice";
import { Loading } from "../components/common";
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
                    setSchedules(response.data);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                toast.error("Lỗi khi lấy dữ liệu lịch học của sinh viên!");
            }
        }

        if (targetDate) {
            fetchStudentSchedule();
        }
    }, [targetDate]);

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
                    <Loading />
                )}
            </div>
        </RequiredAuthPage>
    );
};

export default StudentSchedulePage;

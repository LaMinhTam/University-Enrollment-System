import { useLocation } from "react-router-dom";
import Table from "../modules/schedule/Table";
import Header from "../modules/schedule/Header";
import Footer from "../modules/schedule/Footer";
import RequiredAuthPage from "./RequiredAuthPage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { splitDate } from "../utils/formatTime";
import { UniEnrollSystemAPI } from "../apis/constants";
import { toast } from "react-toastify";
import { ScheduleData } from "../types/studyScheduleType";
import { setDates, setScheduleType } from "../store/actions/scheduleSlice";
import { Loading } from "../components/common";
import { RootState } from "../store/configureStore";
import getWeekDates from "../utils/getWeekDates";
const StudentSchedulePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    const [loading, setLoading] = useState<boolean>(false);

    const [schedules, setSchedules] = useState<ScheduleData[]>([]);

    useEffect(() => {
        document.title = "Lịch học, lịch thi tuần";
        dispatch(setScheduleType(Number(type)));
    }, [dispatch, type]);

    const dates = useSelector((state: RootState) => state.schedule.dates);
    const targetDate = useSelector(
        (state: RootState) => state.schedule.targetDate
    );

    useEffect(() => {
        if (!dates || dates.length <= 0) {
            const weekDays = getWeekDates(targetDate);
            dispatch(setDates(weekDays));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function fetchStudentSchedule(
            day: number,
            month: number,
            year: number
        ) {
            try {
                setLoading(true);
                const response = await UniEnrollSystemAPI.getStudentSchedule(
                    day,
                    month,
                    year
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
            const date = splitDate(targetDate);
            fetchStudentSchedule(date.day, date.month, date.year);
        }

        if (dates && dates.length > 0) {
            const [day, month, year] = dates[0].split("/");
            fetchStudentSchedule(Number(day), Number(month), Number(year));
        }
    }, [dates, targetDate]);

    return (
        <RequiredAuthPage>
            <div className="w-full h-full p-3 mt-5 shadow-md select-none bg-lite md:max-w-[1140px] mx-auto">
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

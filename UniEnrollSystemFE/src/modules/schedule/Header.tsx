import DatePicker from "react-datepicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PrintIcon from "@mui/icons-material/Print";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import {
    setDates,
    setScheduleType,
    setTargetDate,
} from "../../store/actions/scheduleSlice";
import { formatDate } from "../../utils/formatTime";
import { SCHEDULE_TYPE } from "../../constants/global";
const Header = () => {
    const dispatch = useDispatch();
    const scheduleType = useSelector(
        (state: RootState) => state.schedule.scheduleType
    );
    const targetDate = useSelector(
        (state: RootState) => state.schedule.targetDate
    );

    const dates = useSelector((state: RootState) => state.schedule.dates);

    const handleNextCalendar = () => {
        if (!dates) {
            console.error("dates is undefined");
            return;
        }

        // Lấy ngày cuối cùng của tuần hiện tại
        const lastDate = new Date(
            dates[dates.length - 1].split("/").reverse().join("-")
        );
        // Tăng thêm 1 ngày để chuyển sang tuần tiếp theo
        lastDate.setDate(lastDate.getDate() + 1);

        // Tìm ngày đầu tiên của tuần tiếp theo (Thứ Hai)
        const firstDayOfNextWeek = new Date(lastDate);
        const dayOfWeek = firstDayOfNextWeek.getDay();
        const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; // Tính khoảng cách đến thứ Hai
        firstDayOfNextWeek.setDate(firstDayOfNextWeek.getDate() + diffToMonday);

        // Tạo mảng chứa các ngày trong tuần tiếp theo
        const weekDays = Array.from({ length: 7 }, (_, i) => {
            const day = new Date(firstDayOfNextWeek);
            day.setDate(firstDayOfNextWeek.getDate() + i);
            return formatDate(day);
        });

        dispatch(setDates(weekDays));
    };

    const handlePrevCalendar = () => {
        if (!dates) {
            console.error("dates is undefined");
            return;
        }
        const firstDate = new Date(dates[0].split("/").reverse().join("-"));
        firstDate.setDate(firstDate.getDate() - 1);

        const firstDayOfPrevWeek = new Date(firstDate);
        const dayOfWeek = firstDayOfPrevWeek.getDay();
        const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        firstDayOfPrevWeek.setDate(firstDayOfPrevWeek.getDate() + diffToMonday);

        const weekDays = Array.from({ length: 7 }, (_, i) => {
            const day = new Date(firstDayOfPrevWeek);
            day.setDate(firstDayOfPrevWeek.getDate() + i);
            return formatDate(day);
        });

        dispatch(setDates(weekDays));
    };

    const handleSelectDate = (date: Date) => {
        const startOfWeek = new Date(date);
        const dayOfWeek = startOfWeek.getDay();
        const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);

        dispatch(setTargetDate(date.toISOString()));

        const weekDays = Array.from({ length: 7 }, (_, i) => {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            return formatDate(day);
        });

        dispatch(setDates(weekDays));
    };

    const handleNavigateToCurrentDay = () => {
        const today = new Date();
        handleSelectDate(today);
    };

    return (
        <div className="w-full h-full mb-[10px]">
            <h2 className="py-3 font-bold text-text2">
                Lịch học, lịch thi theo tuần
            </h2>
            <div className="items-center justify-center block py-2 border-b md:flex border-b-grayf3">
                <div></div>
                <div className="justify-center block py-2 md:items-center md:ml-auto md:flex gap-x-3">
                    <div className="flex items-center justify-start mb-2 md:justify-center gap-x-3 md:mb-0">
                        <div className="flex items-center justify-center gap-x-2">
                            <input
                                type="radio"
                                name="radScheduleType"
                                id="all"
                                checked={scheduleType === SCHEDULE_TYPE.ALL}
                                onChange={() =>
                                    dispatch(setScheduleType(SCHEDULE_TYPE.ALL))
                                }
                            />
                            <label
                                htmlFor="all"
                                className="text-sm font-medium cursor-pointer"
                            >
                                Tất cả
                            </label>
                        </div>
                        <div className="flex items-center justify-center gap-x-2">
                            <input
                                type="radio"
                                name="radScheduleType"
                                id="study"
                                checked={scheduleType === SCHEDULE_TYPE.STUDY}
                                onChange={() =>
                                    dispatch(
                                        setScheduleType(SCHEDULE_TYPE.STUDY)
                                    )
                                }
                            />
                            <label
                                htmlFor="study"
                                className="text-sm font-medium cursor-pointer"
                            >
                                Lịch học
                            </label>
                        </div>
                        <div className="flex items-center justify-center gap-x-2">
                            <input
                                type="radio"
                                name="radScheduleType"
                                id="exam"
                                checked={scheduleType === SCHEDULE_TYPE.EXAM}
                                onChange={() =>
                                    dispatch(
                                        setScheduleType(SCHEDULE_TYPE.EXAM)
                                    )
                                }
                            />
                            <label
                                htmlFor="exam"
                                className="text-sm font-medium cursor-pointer"
                            >
                                Lịch thi
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center justify-start md:justify-center gap-x-3">
                        <DatePicker
                            selected={new Date(targetDate)}
                            onChange={handleSelectDate}
                            dateFormat={`dd/MM/yyyy`}
                            className="focus:border-tertiary border border-text4 rounded py-2 px-2 w-[160px]"
                            calendarIconClassname="ml-[120px]"
                            showIcon
                            toggleCalendarOnIconClick
                        />
                        <button
                            onClick={handleNavigateToCurrentDay}
                            className="flex items-center justify-center w-[80px] h-[30px] rounded hover:bg-grayf3 hover:text-tertiary text-xs gap-x-1 text-lite bg-tertiary"
                        >
                            <CalendarMonthIcon />
                            <span>Hiện tại</span>
                        </button>
                        <button className="flex items-center justify-center w-[80px] h-[30px] rounded hover:bg-grayf3 hover:text-tertiary text-xs gap-x-1 text-lite bg-tertiary">
                            <PrintIcon />
                            <span>In lịch</span>
                        </button>
                        <button
                            onClick={handlePrevCalendar}
                            className="flex items-center justify-center w-[80px] h-[30px] rounded hover:bg-grayf3 hover:text-tertiary text-xs gap-x-1 text-lite bg-tertiary"
                        >
                            <KeyboardArrowLeftIcon />
                            <span>Trở về</span>
                        </button>
                        <button
                            onClick={handleNextCalendar}
                            className="flex items-center justify-center w-[80px] h-[30px] rounded hover:bg-grayf3 hover:text-tertiary text-xs gap-x-1 text-lite bg-tertiary"
                        >
                            <KeyboardArrowRightIcon />
                            <span>Tiếp</span>
                        </button>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default Header;

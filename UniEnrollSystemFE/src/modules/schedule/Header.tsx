import DatePicker from "react-datepicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PrintIcon from "@mui/icons-material/Print";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { setDates, setTargetDate } from "../../store/actions/scheduleSlice";
import { formatDate } from "../../utils/formatTime";
import { SCHEDULE_TYPE } from "../../constants/global";
const Header = ({ type }: { type: number }) => {
    const dispatch = useDispatch();
    const targetDate = useSelector(
        (state: RootState) => state.schedule.targetDate
    );

    const handleNextCalendar = () => {
        const nextDate = new Date(targetDate);
        nextDate.setDate(nextDate.getDate() + 7);
        dispatch(setTargetDate(nextDate.toISOString()));
        const weekDays = Array.from({ length: 7 }, (_, i) => {
            const day = new Date(nextDate);
            day.setDate(nextDate.getDate() + i);
            return formatDate(day);
        });
        dispatch(setDates(weekDays));
    };

    const handlePrevCalendar = () => {
        const prevDate = new Date(targetDate);
        prevDate.setDate(prevDate.getDate() - 7);
        dispatch(setTargetDate(prevDate.toISOString()));
        const weekDays = Array.from({ length: 7 }, (_, i) => {
            const day = new Date(prevDate);
            day.setDate(prevDate.getDate() + i);
            return formatDate(day);
        });
        dispatch(setDates(weekDays));
    };

    const handleSelectDate = (date: Date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // +1 to make Monday the first day of the week

        dispatch(setTargetDate(date.toISOString()));

        const weekDays = Array.from({ length: 7 }, (_, i) => {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            return formatDate(day);
        });

        dispatch(setDates(weekDays));
    };

    return (
        <div className="w-full h-full mb-[10px]">
            <h2 className="py-3 font-bold text-text2">
                Lịch học, lịch thi theo tuần
            </h2>
            <div className="flex items-center justify-center py-2 border-b border-b-grayf3">
                <div></div>
                <div className="flex items-center justify-center py-2 ml-auto gap-x-3">
                    <div className="flex items-center justify-center gap-x-2">
                        <input
                            type="radio"
                            name="radScheduleType"
                            id="all"
                            checked={type === SCHEDULE_TYPE.ALL}
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
                            checked={type === SCHEDULE_TYPE.STUDY}
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
                            checked={type === SCHEDULE_TYPE.EXAM}
                        />
                        <label
                            htmlFor="exam"
                            className="text-sm font-medium cursor-pointer"
                        >
                            Lịch thi
                        </label>
                    </div>
                    <DatePicker
                        selected={new Date(targetDate)}
                        onChange={handleSelectDate}
                        dateFormat={`dd/MM/yyyy`}
                        className="focus:border-tertiary border border-text4 rounded py-2 px-2 w-[160px]"
                        calendarIconClassname="ml-[120px]"
                        showIcon
                        toggleCalendarOnIconClick
                    />
                    <button className="flex items-center justify-center w-[80px] h-[30px] rounded hover:bg-grayf3 hover:text-tertiary text-xs gap-x-1 text-lite bg-tertiary">
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
                <hr />
            </div>
        </div>
    );
};

export default Header;

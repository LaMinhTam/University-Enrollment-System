import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDates } from "../../store/actions/scheduleSlice";

interface BoxItemProps {
    type: string;
    num: number;
}
const BoxItem = ({ type, num }: BoxItemProps) => {
    const dispatch = useDispatch();
    let className =
        "shadow-md p-[15px] w-full h-full flex flex-col gap-y-3 text-sm cursor-pointer";
    if (type === "reminder") {
        className += " bg-lite";
    } else if (type === "learn-calendar") {
        className += " bg-opacity-30 bg-quaternary text-tertiary";
    } else {
        className += " bg-quinary text-quinary bg-opacity-20";
    }
    let path = "";
    if (type === "reminder") {
        path = "ghi-chu-nhac-nho-sinh-vien";
    } else if (type === "learn-calendar") {
        path = "lich-theo-tuan?type=1";
    } else {
        path = "lich-theo-tuan?type=2";
    }
    return (
        <Link
            className={className}
            to={path}
            onClick={() => dispatch(setDates([]))}
        >
            {type === "reminder" && <span>Nhắc nhở mới, chưa xem</span>}
            {type === "learn-calendar" && <span>Lịch học trong tuần</span>}
            {type === "exam-calendar" && <span>Lịch thi trong tuần</span>}
            <div className="flex items-center justify-between">
                <span className="text-4xl">{num}</span>
                <button>
                    {type === "reminder" ? (
                        <NotificationsNoneIcon />
                    ) : (
                        <CalendarTodayIcon />
                    )}
                </button>
            </div>
            <Link to={path} className="text-sm font-normal text-tertiary">
                Xem chi tiết
            </Link>
        </Link>
    );
};

export default BoxItem;

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link } from "react-router-dom";

interface BoxItemProps {
    type: string;
    num: number;
}
const BoxItem = ({ type, num }: BoxItemProps) => {
    let className =
        "shadow-md p-[15px] w-full h-full flex flex-col gap-y-3 text-sm";
    if (type === "reminder") {
        className += " bg-lite";
    } else if (type === "learn-calendar") {
        className += " bg-opacity-30 bg-quaternary text-tertiary";
    } else {
        className += " bg-quinary text-quinary bg-opacity-20";
    }
    return (
        <div className={className}>
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
            <Link
                to={
                    type === "reminder"
                        ? "ghi-chu-nhac-nho-sinh-vien"
                        : "lich-hoc-tuan"
                }
                className="text-sm font-normal text-tertiary"
            >
                Xem chi tiết
            </Link>
        </div>
    );
};

export default BoxItem;

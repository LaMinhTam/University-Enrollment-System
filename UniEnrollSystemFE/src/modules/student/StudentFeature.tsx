import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InsightsIcon from "@mui/icons-material/Insights";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link } from "react-router-dom";
import handleResetCourseRegisterPage from "../../utils/handleResetCourseRegisterPage";
import { useDispatch } from "react-redux";
const featureList = [
    {
        title: "Lịch theo tuần",
        icon: <CalendarTodayIcon />,
        link: "/lich-theo-tuan",
    },
    {
        title: "Kết quả học tập",
        icon: <InsightsIcon />,
        link: "/ket-qua-hoc-tap",
    },
    {
        title: "Đăng ký học phần",
        icon: <EventAvailableIcon />,
        link: "/dang-ky-hoc-phan",
    },
    {
        title: "Tra cứu công nợ",
        icon: <AttachMoneyIcon />,
        link: "/cong-no-sinh-vien",
    },
    {
        title: "Thanh toán trực tuyến",
        icon: <PaymentIcon />,
        link: "/thanh-toan-truc-tuyen",
    },
    {
        title: "Phiếu thu tổng hợp",
        icon: <ReceiptLongIcon />,
        link: "/phieu-thu-tong-hop",
    },
    {
        title: "Lịch theo tiến độ",
        icon: <CalendarTodayIcon />,
        link: "/lich-theo-tien-do",
    },
    {
        title: "Nhắc nhở",
        icon: <NotificationsNoneIcon />,
        link: "/nhac-nho",
    },
];
const StudentFeature = () => {
    const dispatch = useDispatch();
    return (
        <div className="grid grid-cols-2 gap-4 mt-5 md:grid-cols-8">
            {featureList.map((feature, index) =>
                feature.link === "/dang-ky-hoc-phan" ? (
                    <Link
                        to={feature.link}
                        key={index}
                        onClick={() => handleResetCourseRegisterPage(dispatch)}
                        className="flex flex-col items-center justify-center rounded-lg shadow-md bg-lite p-[10px] h-[120px]"
                    >
                        <div className="text-tertiary w-full flex items-center justify-center h-[50px] mb-[10px]">
                            {feature.icon}
                        </div>
                        <div className="text-sm font-normal text-center">
                            {feature.title}
                        </div>
                    </Link>
                ) : (
                    <Link
                        to={feature.link}
                        key={index}
                        className="flex flex-col items-center justify-center rounded-lg shadow-md bg-lite p-[10px] h-[120px]"
                    >
                        <div className="text-tertiary w-full flex items-center justify-center h-[50px] mb-[10px]">
                            {feature.icon}
                        </div>
                        <div className="text-sm font-normal text-center">
                            {feature.title}
                        </div>
                    </Link>
                )
            )}
        </div>
    );
};

export default StudentFeature;

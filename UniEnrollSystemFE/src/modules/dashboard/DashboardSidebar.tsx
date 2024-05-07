import HomeIcon from "@mui/icons-material/Home";
import ComputerIcon from "@mui/icons-material/Computer";
import SchoolIcon from "@mui/icons-material/School";
import PaymentIcon from "@mui/icons-material/Payment";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import sidebarType from "../../types/sidebarType";
import { Link } from "react-router-dom";
import handleResetCourseRegisterPage from "../../utils/handleResetCourseRegisterPage";
import { useDispatch } from "react-redux";

const sidebarLinks: sidebarType[] = [
    {
        title: "Trang chủ",
        icon: <HomeIcon />,
        link: "/",
    },
    {
        title: "Thông tin chung",
        icon: <ComputerIcon />,
        link: "/",
        subLinks: [
            {
                title: "Thông tin sinh viên",
                link: "/thong-tin-sinh-vien",
            },
            {
                title: "Cập nhật thông tin sinh viên",
                link: "/cap-nhat-thong-tin-sinh-vien",
            },
        ],
    },
    {
        title: "Học tập",
        icon: <SchoolIcon />,
        link: "/",
        subLinks: [
            {
                title: "Kết quả học tập",
                link: "/ket-qua-hoc-tap",
            },
            {
                title: "Lịch theo tuần",
                link: "/lich-theo-tuan?type=1",
            },
        ],
    },
    {
        title: "Đăng ký học phần",
        icon: <EventAvailableIcon />,
        link: "/",
        subLinks: [
            {
                title: "Chương trình khung",
                link: "/chuong-trinh-khung",
            },
            {
                title: "Đăng ký học phần",
                link: "/dang-ky-hoc-phan",
            },
        ],
    },
    {
        title: "Học phí",
        icon: <PaymentIcon />,
        link: "/",
        subLinks: [
            {
                title: "Tra cứu công nợ",
                link: "/tra-cuu-cong-no",
            },
            {
                title: "Thanh toán trực tuyến",
                link: "/thanh-toan-truc-tuyen",
            },
            {
                title: "Phiếu thu tổng hợp",
                link: "/phieu-thu-tong-hop",
            },
        ],
    },
];

const DashboardSidebar = () => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const dispatch = useDispatch();

    const handleIconClick = (index: number) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    return (
        <div
            className="w-full md:w-[220px] bg-white 
        shadow-[10px_10px_20px_0px_rgba(218,_213,_213,_0.15)] px-2 py-10 flex flex-col flex-shrink-0"
        >
            {sidebarLinks.map((item, index) => (
                <div key={index} className="mb-10 cursor-pointer">
                    <div
                        className="flex items-center justify-start gap-x-2"
                        onClick={() => handleIconClick(index)}
                    >
                        {item.icon}
                        <div
                            className={`flex items-center justify-center ${
                                item.subLinks && item.subLinks.length > 0
                                    ? "flex-1"
                                    : ""
                            }`}
                        >
                            {item.subLinks && item.subLinks.length > 0 ? (
                                <span className="text-xs font-semibold text-center uppercase text-text5">
                                    {item.title}
                                </span>
                            ) : (
                                <Link
                                    to={item.link}
                                    className="text-xs font-semibold text-center uppercase text-text5"
                                >
                                    {item.title}
                                </Link>
                            )}
                            {item.subLinks && (
                                <button className="ml-auto">
                                    <ExpandMoreIcon />
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        {item.subLinks && activeIndex === index && (
                            <div className="flex flex-col">
                                {item.subLinks.map((subLink, index) => (
                                    <Link
                                        to={subLink.link}
                                        key={index}
                                        className="hover:text-primary flex items-center hover:border-l-2 hover:border-l-text1 
                                        px-3 py-4 justify-start text-xs text-text5 w-full h-[45px] cursor-pointer"
                                        onClick={() => {
                                            if (
                                                subLink.link ===
                                                "/dang-ky-hoc-phan"
                                            ) {
                                                handleResetCourseRegisterPage(
                                                    dispatch
                                                );
                                            } else {
                                                return;
                                            }
                                        }}
                                    >
                                        <span>{subLink.title}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardSidebar;

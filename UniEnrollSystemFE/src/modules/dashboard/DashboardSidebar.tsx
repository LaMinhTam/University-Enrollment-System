import HomeIcon from "@mui/icons-material/Home";
import ComputerIcon from "@mui/icons-material/Computer";
import SchoolIcon from "@mui/icons-material/School";
import PaymentIcon from "@mui/icons-material/Payment";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useState } from "react";
const sidebarLinks = [
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
                link: "/lich-theo-tuan",
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
    const [activeIndex, setActiveIndex] = useState(-1); // Add this state

    const handleIconClick = (index: number) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    return (
        <div className="w-full md:w-[260px] bg-white shadow-[10px_10px_20px_0px_rgba(218,_213,_213,_0.15)] px-[14px] py-10 flex flex-col flex-shrink-0">
            {sidebarLinks.map((link, index) => (
                <div key={index} className="mb-10">
                    <div
                        className="flex items-center justify-center mb-6"
                        onClick={() => handleIconClick(index)}
                    >
                        {link.icon}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="text-center text-[#333] font-semibold text-sm">
                            {link.title}
                        </div>
                        {link.subLinks && activeIndex === index && (
                            <div className="flex flex-col gap-y-2">
                                {link.subLinks.map((subLink, index) => (
                                    <div
                                        key={index}
                                        className="text-center text-[#333] text-xs"
                                    >
                                        {subLink.title}
                                    </div>
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

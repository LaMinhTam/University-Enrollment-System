import { Fail, Success } from "../../components/common";
const Footer = () => {
    return (
        <div className="mt-[20px]">
            <p className="text-sm italic font-normal text-text2 mb-[20px]">
                Ghi chú: Những môn học / học phần có dấu{" "}
                <strong className="font-bold text-red-500">*</strong> không được
                tính vào Trung bình tích lũy chung
            </p>
            <div className="flex items-center justify-start text-sm font-normal gap-x-3">
                <div className="flex items-center justify-center gap-x-3">
                    <div className="border border-text2 w-[40px] h-[15px] bg-text7 bg-opacity-20"></div>
                    <span>Môn học/Học phần đã (hoặc đang) học</span>
                </div>
                <div className="flex items-center justify-center gap-x-3">
                    <div className="border border-text2 w-[40px] h-[15px] bg-lite bg-opacity-20"></div>
                    <span>Môn học sinh viên chưa đăng ký học tập</span>
                </div>
                <Success text="Đạt" />
                <Fail text="Không đạt" />
            </div>
        </div>
    );
};

export default Footer;

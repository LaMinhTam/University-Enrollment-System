import { Link } from "react-router-dom";
import { IStudent } from "../../types/studentType";
import BoxItem from "./BoxItem";

const StudentInfo = ({ userInfo }: { userInfo: IStudent }) => {
    return (
        <div className="flex items-center justify-center pt-[10px] gap-x-5">
            <div className="flex-3 p-[10px] bg-lite rounded-lg shadow-md">
                <p className="text-lg font-semibold border-b border-b-text3 mb-[10px] py-2">
                    Thông tin sinh viên
                </p>
                <div className="flex items-start justify-center gap-x-2">
                    <div className="flex flex-col items-center justify-center flex-1">
                        <div className="w-[120px] h-[120px] rounded-full mb-[10px]">
                            <img
                                src={"https://source.unsplash.com/random"}
                                alt={userInfo.name}
                                className="object-cover w-full h-full rounded-full"
                            />
                        </div>
                        <Link
                            className="text-sm text-tertiary"
                            to={"/thong-tin-sinh-vien"}
                        >
                            Xem chi tiết
                        </Link>
                    </div>
                    <div className="flex-4 p-[15px] text-sm font-medium flex items-center justify-center gap-x-20">
                        <div>
                            <div className="mb-[15px]">
                                <span>MSSV: </span>
                                <span>{userInfo.id}</span>
                            </div>
                            <div className="mb-[15px]">
                                <span>Họ tên: </span>
                                <span>{userInfo.name}</span>
                            </div>
                            <div className="mb-[15px]">
                                <span>Giới tính: </span>
                                <span>Nam</span>
                            </div>
                            <div className="mb-[15px]">
                                <span>Ngày sinh: </span>
                                <span>17/11/2003</span>
                            </div>
                            <div className="mb-[15px]">
                                <span>Nơi sinh: </span>
                                <span>Tỉnh Phú Yên</span>
                            </div>
                        </div>
                        <div>
                            <div className="mb-[15px]">
                                <span>Lớp học: </span>
                                <span>DHKTPM17C</span>
                            </div>
                            <div className="mb-[15px]">
                                <span>Khóa học: </span>
                                <span>{userInfo.year}</span>
                            </div>
                            <div className="mb-[15px]">
                                <span>Bậc đào tạo: </span>
                                <span>Đại học</span>
                            </div>
                            <div className="mb-[15px]">
                                <span>Loại hình đào tạo: </span>
                                <span>Chính quy</span>
                            </div>
                            <div className="mb-[15px]">
                                <span>Ngành: </span>
                                <span>{userInfo.majorName}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-y-[15px]">
                <BoxItem type="reminder" num={0} />
                <div className="flex items-center justify-center gap-x-[15px]">
                    <BoxItem type="learn-calendar" num={4} />
                    <BoxItem type="exam-calendar" num={0} />
                </div>
            </div>
        </div>
    );
};

export default StudentInfo;

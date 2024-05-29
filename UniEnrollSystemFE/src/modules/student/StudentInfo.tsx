import { Link } from "react-router-dom";
import { IStudent } from "../../types/studentType";
import BoxItem from "./BoxItem";
import { defaultImage } from "../../constants/global";
import { useEffect, useState } from "react";
import { UniEnrollSystemAPI } from "../../apis/constants";
import { ScheduleData } from "../../types/studyScheduleType";

const StudentInfo = ({ userInfo }: { userInfo: IStudent }) => {
    const [learnCount, setLearnCount] = useState<number>(0);
    const [examCount, setExamCount] = useState<number>(0);
    useEffect(() => {
        async function fetchStudySchedule() {
            try {
                const day = new Date().getDate();
                const month = new Date().getMonth() + 1;
                const year = new Date().getFullYear();
                const response = await UniEnrollSystemAPI.getStudentSchedule(
                    day,
                    month,
                    year
                );
                if (response.status === 200) {
                    const data = response.data;
                    let learnCount = 0;
                    let examCount = 0;
                    data.forEach((item: ScheduleData) => {
                        item.schedule.forEach((i) => {
                            if (
                                ["THEORY", "PRACTICE"].includes(
                                    i.schedules.classType
                                )
                            )
                                learnCount++;
                            if (
                                ["FINAL_EXAM", "MID_TERM_EXAM"].includes(
                                    i.schedules.classType
                                )
                            )
                                examCount++;
                        });
                    });
                    setLearnCount(learnCount);
                    setExamCount(examCount);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchStudySchedule();
    }, []);
    return (
        <div className="md:flex items-center justify-center block pt-[10px] md:gap-x-5">
            <div className="flex-3 p-[10px] bg-lite rounded-lg shadow-md md:mb-0 mb-[15px]">
                <p className="text-lg font-semibold border-b border-b-text3 mb-[10px] py-2">
                    Thông tin sinh viên
                </p>
                <div className="items-start justify-center block md:flex gap-x-2">
                    <div className="flex flex-col items-center justify-center flex-1">
                        <div className="w-[120px] h-[120px] rounded-full mb-[10px]">
                            <img
                                src={defaultImage}
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
                    <div className="flex-4 md:p-[15px] py-3 text-sm font-medium flex md:items-center items-start justify-center gap-x-5 md:gap-x-20">
                        <div className="flex-1">
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
                        <div className="flex-1">
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
                    <BoxItem type="learn-calendar" num={learnCount} />
                    <BoxItem type="exam-calendar" num={examCount} />
                </div>
            </div>
        </div>
    );
};

export default StudentInfo;

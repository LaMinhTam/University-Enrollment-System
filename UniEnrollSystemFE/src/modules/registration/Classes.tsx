import { RootState } from "../../store/configureStore";
import { v4 as uuidv4 } from "uuid";
import renderClassesRegistrationStatus from "../../utils/renderClassesRegistrationStatus";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UniEnrollSystemAPI } from "../../apis/constants";
import {
    setClassSchedule,
    setClassScheduleOtherData,
} from "../../store/actions/registrationSlice";
import { IClass } from "../../types/courseType";
import { IClassesEnrolled } from "../../types/classesEnrolledType";
const Classes = () => {
    const courseSelectedClasses = useSelector(
        (state: RootState) => state.registration.courseSelectedClasses
    );
    const [classSelectedId, setClassSelectedId] = useState<string>("");
    const dispatch = useDispatch();
    const handleClickClasses = async (item: IClass) => {
        try {
            const response = await UniEnrollSystemAPI.getClassSchedule(item.id);
            if (response.status === 200) {
                dispatch(setClassSchedule(response.data));
                setClassSelectedId(item.id);
                dispatch(
                    setClassScheduleOtherData({
                        ...(item as IClassesEnrolled),
                    })
                );
            } else {
                toast.error("Không tim thấy thông tin lớp học phần");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
        }
    };
    return (
        <div className="w-full max-h-[600px] overflow-y-auto overflow-x-hidden">
            <div className="w-full px-2 font-bold border-l-4 border-l-error text-text7">
                Lớp học phần chờ đăng ký
            </div>
            <div className="flex items-center justify-end my-5">
                <input
                    type="checkbox"
                    name="chkFilterCalendar"
                    id="chkFilterCalendar"
                />
                <strong className="text-sm font-bold text-error">
                    HIỂN THỊ LỚP HỌC PHẦN KHÔNG TRÙNG LỊCH
                </strong>
            </div>
            <table className="w-full mt-5 border border-collapse border-text2">
                <thead>
                    <tr className="bg-text7 bg-opacity-10">
                        <th>STT</th>
                        <th>Thông tin lớp học phần</th>
                        <th>Đã đăng ký</th>
                    </tr>
                </thead>
                <tbody>
                    {courseSelectedClasses.map((item, index) => (
                        <tr
                            key={uuidv4()}
                            className={`w-full cursor-pointer bg-strock ${
                                classSelectedId === item.id ? "chk-course" : ""
                            }`}
                            onClick={() => handleClickClasses(item)}
                        >
                            <td>{index + 1}</td>
                            <td>
                                <strong>{item.courseName}</strong>
                                <br />
                                Trạng thái:{" "}
                                <strong className="text-error">
                                    {renderClassesRegistrationStatus(
                                        item.status
                                    )}
                                </strong>
                                <br />
                                Mã lớp học phần: <strong>{item.id}</strong>
                            </td>
                            <td className="text-sm font-bold text-center text-error">
                                {item.quantity}/{item.maxCapacity}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Classes;

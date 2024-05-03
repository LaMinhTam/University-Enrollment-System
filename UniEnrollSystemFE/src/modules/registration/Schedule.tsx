import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { v4 as uuidv4 } from "uuid";
import formatTime from "../../utils/formatTime";
import renderClassesRegistrationStatus from "../../utils/renderClassesRegistrationStatus";
import { UniEnrollSystemAPI } from "../../apis/constants";
import { toast } from "react-toastify";
import {
    setCourseChangeQuantityId,
    setCourseSelectedClasses,
    setRegisterClasses,
} from "../../store/actions/registrationSlice";
import renderDayOfWeek from "../../utils/renderDayOfWeek";
import { useState } from "react";
import Swal from "sweetalert2";
import handleChangeQuantityOfClass, {
    handleIncrementQuantityOfClass,
} from "../../utils/handleChangeQuantityOfClass";
const Schedule = () => {
    const dispatch = useDispatch();
    const [selectedGroup, setSelectedGroup] = useState(0);
    const [isSelectedGroup, setIsSelectedGroup] = useState(false);
    const classSchedule = useSelector(
        (state: RootState) => state.registration.classSchedule
    );
    const courseSelectedClasses = useSelector(
        (state: RootState) => state.registration.courseSelectedClasses
    );
    const registerClasses = useSelector(
        (state: RootState) => state.registration.registerClasses
    );
    const handleRegistrationClasses = async () => {
        const isExist = registerClasses.some(
            (item) => item.id === classSchedule.id
        );
        const isChangeClass = registerClasses.some(
            (item) =>
                item.id !== classSchedule.id &&
                item.courseId === classSchedule.courseId
        );
        const isPractice = classSchedule.schedules.some(
            (item) => item.classType === "PRACTICE"
        );
        if (isExist) {
            toast.error("Lớp học phần đã được đăng ký");
            return;
        } else if (isPractice && !isSelectedGroup) {
            toast.error("Bạn chưa chọn nhóm thực hành!");
        } else {
            if (classSchedule.status === "WAITING") {
                try {
                    const groupId = isPractice ? selectedGroup : 0;
                    if (isChangeClass) {
                        const oldClass = registerClasses.find(
                            (item) => item.courseId === classSchedule.courseId
                        );
                        if (oldClass) {
                            Swal.fire({
                                title: "Bạn có chắc muốn thay đổi lớp học phần?",
                                showCancelButton: true,
                                confirmButtonText: "Đồng ý",
                                cancelButtonText: "Hủy",
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                    const response =
                                        await UniEnrollSystemAPI.changeClassesEnrolled(
                                            oldClass.id,
                                            classSchedule.id,
                                            groupId
                                        );
                                    if (response.status === 200) {
                                        const newRegisterClasses =
                                            registerClasses.map((item) => {
                                                if (
                                                    item.id === oldClass.id &&
                                                    item.courseId ===
                                                        classSchedule.courseId
                                                ) {
                                                    return classSchedule;
                                                }
                                                return item;
                                            });
                                        dispatch(
                                            setRegisterClasses(
                                                newRegisterClasses
                                            )
                                        );
                                        const newCourseSelectedClasses =
                                            handleChangeQuantityOfClass(
                                                courseSelectedClasses,
                                                classSchedule,
                                                oldClass.id
                                            );
                                        dispatch(
                                            setCourseSelectedClasses(
                                                newCourseSelectedClasses
                                            )
                                        );
                                        dispatch(
                                            setCourseChangeQuantityId(
                                                classSchedule.courseId
                                            )
                                        );
                                        setIsSelectedGroup(false);
                                        setSelectedGroup(0);
                                        toast.success(
                                            "Đổi lớp học phần thành công"
                                        );
                                    }
                                } else {
                                    return;
                                }
                            });
                        }
                    } else {
                        const response =
                            await UniEnrollSystemAPI.classesEnrolled(
                                classSchedule.id,
                                groupId
                            );
                        if (response.status === 200) {
                            const newCourseSelectedClasses =
                                handleIncrementQuantityOfClass(
                                    courseSelectedClasses,
                                    classSchedule
                                );
                            dispatch(
                                setRegisterClasses([
                                    ...registerClasses,
                                    classSchedule,
                                ])
                            );
                            dispatch(
                                setCourseSelectedClasses(
                                    newCourseSelectedClasses
                                )
                            );
                            dispatch(
                                setCourseChangeQuantityId(
                                    classSchedule.courseId
                                )
                            );
                            setIsSelectedGroup(false);
                            setSelectedGroup(0);
                            toast.success("Đăng ký lớp học phần thành công");
                        }
                    }
                } catch (error) {
                    toast.error("Đã có lỗi xảy ra!");
                }
            }
        }
    };
    const handleClickedPracticeSchedule = (
        group: number,
        classType: string
    ) => {
        if (classType === "PRACTICE") {
            setSelectedGroup(group);
            setIsSelectedGroup(!isSelectedGroup);
        }
    };

    return (
        <div className="w-full">
            <div className="w-full px-2 font-bold border-l-4 border-l-error text-text7">
                Chi tiết lớp học phần
            </div>
            <div className="flex items-center justify-end mt-5">
                <button className="px-3 py-[6px] text-lite text-center bg-quinary">
                    Xem lịch trùng
                </button>
            </div>
            <table className="w-full mt-5 border border-collapse border-text2">
                <thead>
                    <tr className="bg-text7 bg-opacity-10">
                        <th>
                            Trạng thái:{" "}
                            <strong className="text-sm font-bold text-error">
                                {renderClassesRegistrationStatus(
                                    classSchedule.status
                                )}
                            </strong>
                        </th>
                        <th>Nhóm</th>
                        <th>Sĩ số tối đa: {classSchedule.maxCapacity}</th>
                    </tr>
                </thead>
                <tbody>
                    {classSchedule.schedules
                        ?.filter(
                            (schedule) =>
                                schedule.classType === "THEORY" ||
                                schedule.classType === "PRACTICE"
                        )
                        .map((s) => (
                            <tr
                                className={`cursor-pointer ${
                                    isSelectedGroup &&
                                    s.classType === "PRACTICE"
                                        ? "chkPractice"
                                        : ""
                                } ${
                                    s.classType === "THEORY" ? "chk-course" : ""
                                }`}
                                key={uuidv4()}
                                onClick={() =>
                                    handleClickedPracticeSchedule(
                                        s.group,
                                        s.classType
                                    )
                                }
                            >
                                <td>
                                    <span>
                                        Lịch học:{" "}
                                        {s.classType === "THEORY" ? "LT" : "TH"}{" "}
                                        - Thứ {renderDayOfWeek(s.dayOfWeek)}{" "}
                                        (Tiết {s.timeSlot})
                                    </span>
                                    <br />
                                    <span>
                                        Cơ sở: Cơ sở 1 (Thành phố Hồ Chí Minh)
                                    </span>
                                    <br />
                                    <span>
                                        Dãy nhà: {s.room.split(/(\d+)/)[0]}{" "}
                                        (CS1)
                                    </span>
                                    <br />
                                    <span>Phòng: {s.room}</span>
                                </td>
                                {s.classType === "PRACTICE" ? (
                                    <td>{s.group}</td>
                                ) : (
                                    <td></td>
                                )}
                                <td>
                                    <span>GV: {s.lecturer}</span>
                                    <br />
                                    <span>
                                        {formatTime(s.startDate + "")} -{" "}
                                        {formatTime(s.endDate + "")}
                                    </span>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div className="flex items-center justify-center">
                <button
                    className="px-5 h-[44px] text-lite text-center bg-tertiary w-[210px] mt-5"
                    onClick={handleRegistrationClasses}
                    disabled={classSchedule.status !== "WAITING"}
                >
                    Đăng ký
                </button>
            </div>
        </div>
    );
};

export default Schedule;

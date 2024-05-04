import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { v4 as uuidv4 } from "uuid";
import formatTime from "../../utils/formatTime";
import renderClassesRegistrationStatus from "../../utils/renderClassesRegistrationStatus";
import { toast } from "react-toastify";
import renderDayOfWeek from "../../utils/renderDayOfWeek";
import { useState } from "react";
import Swal from "sweetalert2";
import handleChangeClass from "../../utils/handleChangeClass";
import handleEnrollClass from "../../utils/handleEnrollClass";
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
            if (
                classSchedule.status === "WAITING" ||
                classSchedule.status === "OPENED"
            ) {
                try {
                    if (classSchedule.quantity < classSchedule.maxCapacity) {
                        const groupId = isPractice ? selectedGroup : 0;
                        if (isChangeClass) {
                            const oldClass = registerClasses.find(
                                (item) =>
                                    item.courseId === classSchedule.courseId
                            );
                            if (oldClass) {
                                Swal.fire({
                                    title: "Bạn có chắc muốn thay đổi lớp học phần?",
                                    showCancelButton: true,
                                    confirmButtonText: "Đồng ý",
                                    cancelButtonText: "Hủy",
                                }).then(async (result) => {
                                    if (result.isConfirmed) {
                                        await handleChangeClass(
                                            groupId,
                                            oldClass,
                                            classSchedule,
                                            registerClasses,
                                            dispatch,
                                            courseSelectedClasses,
                                            setIsSelectedGroup,
                                            setSelectedGroup
                                        );
                                    } else {
                                        return;
                                    }
                                });
                            }
                        } else {
                            await handleEnrollClass(
                                groupId,
                                classSchedule,
                                registerClasses,
                                dispatch,
                                courseSelectedClasses,
                                setIsSelectedGroup,
                                setSelectedGroup
                            );
                        }
                    } else {
                        toast.error("Lớp học phần đã đầy!");
                        return;
                    }
                } catch (error) {
                    toast.error("Đã có lỗi xảy ra!");
                }
            } else if (classSchedule.status === "CLOSED") {
                toast.error("Lớp học phần đã đóng!");
            } else if (classSchedule.status === "PLANNING") {
                toast.error("Lớp học phần đang lên kế hoạch!");
            }
        }
    };
    const handleClickedPracticeSchedule = (
        group: number,
        classType: string
    ) => {
        if (classType === "PRACTICE") {
            setSelectedGroup(group);
            if (selectedGroup === group) {
                setIsSelectedGroup(!isSelectedGroup);
            } else {
                setIsSelectedGroup(true);
            }
        }
    };

    return (
        <div className="w-full">
            <div className="w-full px-2 font-bold border-l-4 border-l-error text-text7">
                Chi tiết lớp học phần
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
                                    selectedGroup === s.group &&
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
                >
                    Đăng ký
                </button>
            </div>
        </div>
    );
};

export default Schedule;

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
import { Loading } from "../../components/common";
import { UniEnrollSystemAPI } from "../../apis/constants";
const Schedule = () => {
    const dispatch = useDispatch();
    const [selectedGroup, setSelectedGroup] = useState(0);
    const [isSelectedGroup, setIsSelectedGroup] = useState(false);

    const [loading, setLoading] = useState<boolean>(false);
    const enrollLoading = useSelector(
        (state: RootState) => state.registration.enrollLoading
    );
    const classSchedule = useSelector(
        (state: RootState) => state.registration.classSchedule
    );
    const waitingCourses = useSelector(
        (state: RootState) => state.registration.waitingCourses
    );
    const registerClasses = useSelector(
        (state: RootState) => state.registration.registerClasses
    );
    const courseSelectedCredit = useSelector(
        (state: RootState) => state.registration.courseSelectedCredit
    );
    const courseSelectedFee = useSelector(
        (state: RootState) => state.registration.courseSelectedFee
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
                                            setIsSelectedGroup,
                                            setSelectedGroup,
                                            courseSelectedFee
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
                                setIsSelectedGroup,
                                setSelectedGroup,
                                courseSelectedCredit,
                                courseSelectedFee
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

    const handleRegistrationToSubClass = async () => {
        const isExist = waitingCourses.some(
            (item) => item.id === classSchedule.courseId
        );
        if (isExist) {
            toast.error("Học phần đã được đăng ký dự phòng");
            return;
        } else {
            try {
                setLoading(true);
                const response =
                    await UniEnrollSystemAPI.registrationToWaitingList(
                        classSchedule.courseId,
                        classSchedule.semester,
                        classSchedule.year
                    );
                if (response.status === 200) {
                    setLoading(false);
                    toast.success(response.message);
                }
            } catch (error) {
                setLoading(false);
                toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau!");
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
                                        - {renderDayOfWeek(s.dayOfWeek)} (Tiết{" "}
                                        {s.timeSlot})
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

            <div className="flex items-center justify-center gap-x-3">
                <button
                    className="px-5 h-[44px] text-lite hover:bg-quinary bg-tertiary w-[210px] mt-5 flex items-center justify-center"
                    onClick={handleRegistrationClasses}
                    disabled={enrollLoading || !classSchedule.courseId}
                >
                    {enrollLoading ? <Loading /> : "Đăng ký"}
                </button>
                <button
                    className="px-5 h-[44px] text-text7 hover:bg-primary hover:text-lite bg-senary w-[230px] mt-5 flex items-center justify-center"
                    onClick={handleRegistrationToSubClass}
                    disabled={loading || !classSchedule.courseId}
                >
                    {loading ? <Loading /> : "Đăng ký lớp dự phòng"}
                </button>
            </div>
        </div>
    );
};

export default Schedule;

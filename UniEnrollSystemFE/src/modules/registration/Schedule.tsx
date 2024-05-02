import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { v4 as uuidv4 } from "uuid";
import formatTime from "../../utils/formatTime";
import renderClassesRegistrationStatus from "../../utils/renderClassesRegistrationStatus";
import { UniEnrollSystemAPI } from "../../apis/constants";
import { toast } from "react-toastify";
import {
    setCourseSelectedClasses,
    setRegisterClasses,
} from "../../store/actions/registrationSlice";
import renderDayOfWeek from "../../utils/renderDayOfWeek";
const Schedule = () => {
    const dispatch = useDispatch();
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
        const isExist = registerClasses.find(
            (item) => item.id === classSchedule.id
        );
        if (isExist) {
            toast.error("Lớp học phần đã được đăng ký");
            return;
        } else {
            if (classSchedule.status === "WAITING") {
                const response = await UniEnrollSystemAPI.classesEnrolled(
                    classSchedule.id
                );
                if (response.status === 200) {
                    const newCourseSelectedClasses = courseSelectedClasses.map(
                        (course) => {
                            if (course.id === classSchedule.id) {
                                return {
                                    ...course,
                                    quantity: course.quantity + 1,
                                };
                            }
                            return course;
                        }
                    );
                    dispatch(
                        setRegisterClasses([...registerClasses, classSchedule])
                    );
                    dispatch(
                        setCourseSelectedClasses(newCourseSelectedClasses)
                    );
                    toast.success("Đăng ký lớp học phần thành công");
                } else {
                    toast.error(response.message);
                }
            }
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
                            <tr className="bg-senary" key={uuidv4()}>
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
                                <td>{s.group || ""}</td>
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

import { RootState } from "../../store/configureStore";
import { v4 as uuidv4 } from "uuid";
import renderClassesRegistrationStatus from "../../utils/renderClassesRegistrationStatus";
import { IClass } from "../../types/courseType";
import { useDispatch, useSelector } from "react-redux";
import {
    setClassSchedule,
    setClassSelectedId,
    setCourseSelectedClasses,
    setIsFilterDuplicateSchedule,
} from "../../store/actions/registrationSlice";
import filterDuplicateSchedule from "../../utils/filterDuplicateSchedule";
const Classes = () => {
    const courseSelectedClasses = useSelector(
        (state: RootState) => state.registration.courseSelectedClasses
    );
    const dispatch = useDispatch();
    const classSelectedId = useSelector(
        (state: RootState) => state.registration.classSelectedId
    );
    const handleClickClasses = (item: IClass) => {
        dispatch(setClassSelectedId(item.id));
        dispatch(setClassSchedule(item));
    };
    const classesEnrolledSchedule = useSelector(
        (state: RootState) => state.registration.classesEnrolledSchedule
    );
    const storedSelectedClasses = useSelector(
        (state: RootState) => state.registration.storedCourseSelectedClasses
    );
    const handleFilterDuplicateSchedule = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            const newCourseSelectedClasses = filterDuplicateSchedule(
                courseSelectedClasses,
                classesEnrolledSchedule
            );
            dispatch(setCourseSelectedClasses(newCourseSelectedClasses));
        } else {
            dispatch(setCourseSelectedClasses(storedSelectedClasses));
        }
    };

    return (
        <div className="w-full max-h-[600px] overflow-y-auto overflow-x-hidden mb-3 md:mb-0">
            <div className="w-full px-2 font-bold border-l-4 border-l-error text-text7">
                Lớp học phần chờ đăng ký
            </div>
            <div className="flex items-center justify-end my-5">
                <input
                    type="checkbox"
                    name="chkFilterCalendar"
                    id="chkFilterCalendar"
                    onChange={(e) => {
                        handleFilterDuplicateSchedule(e);
                        dispatch(
                            setIsFilterDuplicateSchedule(e.target.checked)
                        );
                    }}
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

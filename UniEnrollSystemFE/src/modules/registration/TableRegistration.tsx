import PrintIcon from "@mui/icons-material/Print";
import CheckIcon from "@mui/icons-material/Check";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import { useState } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";
import { v4 as uuidv4 } from "uuid";
import renderClassesRegistrationStatus from "../../utils/renderClassesRegistrationStatus";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { UniEnrollSystemAPI } from "../../apis/constants";
import { toast } from "react-toastify";
import { setRegisterClasses } from "../../store/actions/registrationSlice";
const TableRegistration = () => {
    const registerClasses = useSelector(
        (state: RootState) => state.registration.registerClasses
    );
    const dispatch = useDispatch();
    console.log("TableRegistration ~ registerClasses:", registerClasses);
    const [classesClickedId, setClassesClickedId] = useState("");
    console.log("TableRegistration ~ classesClickedId:", classesClickedId);
    const {
        show: showAction,
        setShow: setShowAction,
        nodeRef: actionRef,
    } = useClickOutSide();
    // const handleCalculateTotalCredit = (data: IClassesEnrolled[]) => {
    //     return data.reduce((acc, cur) => acc + cur.course.credit, 0);
    // };
    const handleRemoveClassesRegistration = async (id: string) => {
        if (!id) return;
        const response = await UniEnrollSystemAPI.removeClassesEnrolled(id);
        if (response.status === 200) {
            const newRegisterClasses = registerClasses.filter(
                (item) => item.id !== id
            );
            dispatch(setRegisterClasses(newRegisterClasses));
            toast.success("Hủy lớp học phần thành công");
        }
    };
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="w-full px-2 font-bold border-l-4 border-l-error text-text7">
                    Lớp HP đã đăng ký trong học kỳ này
                </div>
                <button className="flex items-center justify-center px-4 py-2 rounded hover:text-tertiary hover:bg-strock gap-x-2 bg-tertiary text-lite">
                    <PrintIcon />
                    <span className="font-normal">In</span>
                </button>
            </div>
            <table className="w-full mt-5 border border-collapse border-text2">
                <thead>
                    <tr>
                        <th>Thao tác</th>
                        <th>STT</th>
                        <th>Mã lớp HP</th>
                        <th>Tên môn học/HP</th>
                        <th>Lớp học dự kiến</th>
                        <th>TC</th>
                        <th>Nhóm TH</th>
                        <th>Học phí</th>
                        <th>Hạn nộp</th>
                        <th>Thu</th>
                        <th>Trạng thái ĐK</th>
                        <th>Ngày ĐK</th>
                        <th>TT lớp HP</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={5} className="text-center">
                            Tổng
                        </td>
                        {/* <td>{handleCalculateTotalCredit(data)}</td> */}
                        <td>19</td>
                    </tr>
                    {registerClasses.map((item, index) => (
                        <tr
                            key={uuidv4()}
                            className={`cursor-pointer ${
                                classesClickedId === item.id ? "chk-course" : ""
                            }`}
                            onClick={() => setClassesClickedId(item.id)}
                        >
                            <td className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowAction(true);
                                        setClassesClickedId(item.id);
                                    }}
                                    className="flex items-center justify-center w-8 h-8 rounded-full text-lite bg-tertiary"
                                >
                                    <ArrowDropUpRoundedIcon />
                                </button>
                                {showAction && classesClickedId === item.id && (
                                    <div
                                        className="absolute top-[-20px] left-[-125px] z-50"
                                        ref={actionRef}
                                    >
                                        <div className="flex flex-col w-full h-[80px] min-w-[120px] bg-lite shadow-md">
                                            <button
                                                onClick={() =>
                                                    handleRemoveClassesRegistration(
                                                        item.id
                                                    )
                                                }
                                                className="w-full h-[40px] hover:bg-error hover:text-lite"
                                            >
                                                Hủy
                                            </button>
                                            <button className="w-full h-[40px] hover:bg-primary hover:text-lite">
                                                Xem lịch học
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </td>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.courseName}</td>
                            <td>{item.id}</td>
                            <td>3</td>
                            <td></td>
                            <td>2.450.000</td>
                            <td>13/05/2024</td>
                            <td>
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                    <CheckIcon />
                                </span>
                            </td>
                            <td>Đã đăng ký</td>
                            <td>13/05/2024</td>
                            <td className="text-sm font-medium text-error">
                                {renderClassesRegistrationStatus(item.status)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableRegistration;
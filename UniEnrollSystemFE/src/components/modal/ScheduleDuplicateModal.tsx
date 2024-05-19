import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useDispatch, useSelector } from "react-redux";
import {
    setDuplicateSchedule,
    setIsOpenScheduleDuplicateModal,
} from "../../store/actions/modalSlice";
import { RootState } from "../../store/configureStore";
import formatTime from "../../utils/formatTime";
const ScheduleDuplicateModal = () => {
    const dispatch = useDispatch();
    const duplicateSchedule = useSelector(
        (state: RootState) => state.modal.duplicateSchedule
    );
    return (
        <div className="w-[1000px] h-full flex flex-col rounded-lg">
            <div className="flex items-center w-full h-[48px] p-2 bg-strock">
                <div className="w-full px-2 font-bold border-l-4 border-l-error text-text7">
                    Lịch học trùng
                </div>
                <button
                    onClick={() => {
                        dispatch(setIsOpenScheduleDuplicateModal(false));
                        dispatch(setDuplicateSchedule([]));
                    }}
                    className="flex items-center justify-center w-8 h-8 mb-1 rounded-full hover:bg-text3 hover:bg-opacity-10"
                >
                    <CloseRoundedIcon />
                </button>
            </div>
            <table className="m-3 mt-5 border border-collapse border-text2">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã LHP</th>
                        <th>Tên môn học</th>
                        <th>Lịch học</th>
                        <th>Nhóm</th>
                        <th>Phòng</th>
                        <th>Dãy nhà</th>
                        <th>Giảng viên</th>
                        <th>Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {duplicateSchedule.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.existingClassId}</td>
                            <td>{item.existingCourseName}</td>
                            <td>
                                {item.existingSchedule.classType === "THEORY"
                                    ? "LT"
                                    : "TH"}{" "}
                                - {item.existingSchedule.dayOfWeek} (Tiết{" "}
                                {item.existingSchedule.timeSlot})
                            </td>
                            <td>
                                {item.existingSchedule.group !== 0
                                    ? item.existingSchedule.group
                                    : ""}
                            </td>
                            <td>{item.existingSchedule.room}</td>
                            <td>
                                {item.existingSchedule.room.split(/(\d+)/)[0]}
                            </td>
                            <td>{item.existingSchedule.lecturer}</td>
                            <td>
                                {formatTime(
                                    item.existingSchedule.startDate + ""
                                )}
                                -
                                {formatTime(item.existingSchedule.endDate + "")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleDuplicateModal;

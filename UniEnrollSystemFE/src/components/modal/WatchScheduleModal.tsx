import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useDispatch, useSelector } from "react-redux";
import {
    setClassSelectedSchedule,
    setIsOpenWatchScheduleModal,
} from "../../store/actions/modalSlice";
import { RootState } from "../../store/configureStore";
import { IClassesEnrolledSchedule } from "../../types/commonType";
import formatTime from "../../utils/formatTime";
import { v4 as uuidv4 } from "uuid";
import renderDayOfWeek from "../../utils/renderDayOfWeek";
const WatchScheduleModal = () => {
    const dispatch = useDispatch();
    const classSelectedSchedule = useSelector(
        (state: RootState) => state.modal.classSelectedSchedule
    );
    return (
        <div className="w-[1000px] h-full flex flex-col rounded-lg">
            <div className="flex items-center w-full h-[48px] p-2 bg-strock">
                <div className="w-full px-2 font-bold border-l-4 border-l-error text-text7">
                    Chi tiết lớp học
                </div>
                <button
                    onClick={() => {
                        dispatch(setIsOpenWatchScheduleModal(false));
                        dispatch(setClassSelectedSchedule([]));
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
                        <th>Lịch học</th>
                        <th>Nhóm</th>
                        <th>Phòng</th>
                        <th>Dãy nhà</th>
                        <th>Cơ sở</th>
                        <th>Giảng viên</th>
                        <th>Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {classSelectedSchedule.map((item, index) => (
                        <TableItem key={uuidv4()} item={item} index={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const TableItem = ({
    item,
    index,
}: {
    item: IClassesEnrolledSchedule;
    index: number;
}) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                {item.classType === "THEORY" ? "LT - " : "TH - "}{" "}
                {renderDayOfWeek(item.dayOfWeek)} (Tiết {item.timeSlot})
            </td>
            <td>{item.group !== 0 ? item.group : ""}</td>
            <td>{item.room}</td>
            <td>{item.room?.split(/(\d+)/)[0]} (CS1)</td>
            <td>Cơ sở 1 (Thành phố Hồ Chí Minh)</td>
            <td>{item.lecturer}</td>
            <td>
                {formatTime(item.startDate + "")} -{" "}
                {formatTime(item.endDate + "")}
            </td>
        </tr>
    );
};
export default WatchScheduleModal;

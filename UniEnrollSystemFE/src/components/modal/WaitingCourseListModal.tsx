import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenWaitingCourseModal } from "../../store/actions/modalSlice";
import { useEffect, useState } from "react";
import { RootState } from "../../store/configureStore";
import { UniEnrollSystemAPI } from "../../apis/constants";
import { setWaitingCourses } from "../../store/actions/registrationSlice";
import { toast } from "react-toastify";
import { Loading } from "../common";
import { Tooltip as ReactTooltip } from "react-tooltip";
import handleTooltipContent from "../../utils/handleTooltipContent";
const WaitingCourseListModal = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const registrationPeriod = useSelector(
        (state: RootState) => state.registration.registrationPeriod
    );

    const waitingCourses = useSelector(
        (state: RootState) => state.registration.waitingCourses
    );

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const waitingRes = await UniEnrollSystemAPI.getWaitingCourses(
                    registrationPeriod.semester,
                    registrationPeriod.year
                );
                if (waitingRes.status === 200) {
                    dispatch(setWaitingCourses(waitingRes.data));
                }
            } catch (error) {
                toast.error("Lỗi không xác định");
            } finally {
                setLoading(false);
            }
        }
        if (
            registrationPeriod.semester !== 0 &&
            registrationPeriod.year !== 0
        ) {
            fetchData();
        }
    }, [dispatch, registrationPeriod.semester, registrationPeriod.year]);
    return (
        <div className="w-[1000px] h-full flex flex-col rounded-lg">
            <div className="flex items-center w-full h-[48px] p-2 bg-strock">
                <div className="w-full px-2 font-bold border-l-4 border-l-error text-text7">
                    Danh sách môn học đã đăng ký vào danh sách chờ
                </div>
                <button
                    onClick={() => {
                        dispatch(setIsOpenWaitingCourseModal(false));
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
                        <th>Mã môn</th>
                        <th>Tên môn học</th>
                        <th>Số TC</th>
                        <th>Số TC lý thuyết</th>
                        <th>Số TC thực hành</th>
                        <th>Môn tiên quyết</th>
                        <th>Học phí</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td className="text-center" colSpan={8}>
                                <Loading />
                            </td>
                        </tr>
                    ) : (
                        waitingCourses.map((course, index) => (
                            <tr key={course.id}>
                                <td>{index + 1}</td>
                                <td>{course.id}</td>
                                <td>{course.name}</td>
                                <td>{course.credit}</td>
                                <td>{course.theoryCredit}</td>
                                <td>{course.practicalCredit}</td>
                                {course.prerequisites &&
                                course.prerequisites.length > 0 ? (
                                    <td
                                        className="text-sm font-medium cursor-pointer text-error"
                                        data-tooltip-id={course.id}
                                        data-tooltip-html={handleTooltipContent(
                                            course.prerequisites
                                        )}
                                    >
                                        {course.prerequisites
                                            .map(
                                                (prerequisite) =>
                                                    prerequisite.id.split(
                                                        "4203"
                                                    )[1]
                                            )
                                            .join(", ") + "(a)"}
                                        <ReactTooltip
                                            id={course.id}
                                            style={{
                                                color: "#578EBE",
                                                maxWidth: "500px",
                                                backgroundColor: "#fff9c0",
                                                boxShadow: "0 0 5px #333",
                                            }}
                                        />
                                    </td>
                                ) : (
                                    <td></td>
                                )}
                                <td>{course.fee}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default WaitingCourseListModal;

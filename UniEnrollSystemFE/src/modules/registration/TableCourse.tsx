import CheckIcon from "@mui/icons-material/Check";
import { ICourseRegistration } from "../../types/courseType";
import { v4 as uuidv4 } from "uuid";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
    setCourseSelectedClasses,
    setCourseSelectedId,
} from "../../store/actions/registrationSlice";
import { RootState } from "../../store/configureStore";
const TableCourse = ({
    data,
    tableClassesRef,
}: {
    data: ICourseRegistration[];
    tableClassesRef: React.RefObject<HTMLDivElement>;
}) => {
    const dispatch = useDispatch();
    const courseSelectedId = useSelector(
        (state: RootState) => state.registration.courseSelectedId
    );
    const handleTooltipContent = (
        prerequisites: {
            id: string;
            name: string;
            credit: number;
            theoryCredit: number;
            practicalCredit: number;
        }[]
    ) => {
        const header =
            "<tr><th>Mã học phần</th><th>Tên môn học / học phần</th><th>Số TC</th><th>Số TC lý thuyết</th><th>Số TC thực hành</th></tr>";
        const rows = prerequisites
            .map((prerequisite) => {
                const id = prerequisite.id;
                const name = prerequisite.name;
                const credit = prerequisite.credit;
                const theoryCredit = prerequisite.theoryCredit;
                const practicalCredit = prerequisite.practicalCredit;

                return `<tr><td>${id}</td><td>${name}</td><td>${credit}</td><td>${theoryCredit}</td><td>${practicalCredit}</td></tr>`;
            })
            .join("");
        return `<table>${header}${rows}</table>`;
    };
    const handleClickCourse = (item: ICourseRegistration) => {
        dispatch(setCourseSelectedId(item.course.id));
        dispatch(setCourseSelectedClasses(item.classes));
        tableClassesRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    if (!data) return null;
    return (
        <div className="mt-5 mb-10">
            <div className="w-full px-2 font-bold border-l-4 border-l-error text-text7">
                Môn học/học phần đang chờ đăng ký
            </div>
            <table className="w-full mt-5 border border-collapse border-text2">
                <thead>
                    <tr className="bg-text7 bg-opacity-10">
                        <th className="p-3"></th>
                        <th>STT</th>
                        <th>Mã học phần</th>
                        <th>Tên môn học / Học phần</th>
                        <th>Số tín chỉ</th>
                        <th>Bắt buộc</th>
                        <th>
                            học phần: học trước (a), tiên quyết (b), song hành
                            (c)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={uuidv4()}
                            className={`cursor-pointer ${
                                courseSelectedId === item.course.id
                                    ? "chk-course"
                                    : ""
                            }`}
                            onClick={() => handleClickCourse(item)}
                        >
                            <td>
                                <input
                                    type="radio"
                                    name="chkCourse"
                                    id={item.course.id}
                                    checked={
                                        courseSelectedId === item.course.id
                                    }
                                    onChange={() => handleClickCourse(item)}
                                />
                            </td>
                            <td>{index + 1}</td>
                            <td>{item.course.id}</td>
                            <td>{item.course.name}</td>
                            <td>{item.course.credit}</td>
                            <td>
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                    <CheckIcon />
                                </span>
                            </td>
                            {item.course.prerequisites &&
                            item.course.prerequisites.length > 0 ? (
                                <td
                                    className="text-sm font-medium cursor-pointer text-error"
                                    data-tooltip-id={item.course.id}
                                    data-tooltip-html={handleTooltipContent(
                                        item.course.prerequisites
                                    )}
                                >
                                    {item.course.prerequisites
                                        .map(
                                            (prerequisite) =>
                                                prerequisite.id.split("4203")[1]
                                        )
                                        .join(", ") + "(a)"}
                                    <ReactTooltip
                                        id={item.course.id}
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableCourse;

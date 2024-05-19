import { Tooltip as ReactTooltip } from "react-tooltip";
import { ICourses } from "../../types/educationProgramType";
import { Fail, Success } from "../../components/common";
interface TableItemProps {
    course: ICourses;
    handleTooltipContent: (
        prerequisites: {
            id: string;
            name: string;
            credit: number;
            theoryCredit: number;
            practicalCredit: number;
        }[]
    ) => string;
    index: number;
}
const TableItem = ({ course, handleTooltipContent, index }: TableItemProps) => {
    return (
        <tr className={`${course.isPass ? "bg-text7 text-text3" : ""}`}>
            <td>{index + 1}</td>
            <td>{course.name}</td>
            <td>{course.id}</td>
            {course.prerequisites.length > 0 ? (
                <td
                    className="text-sm font-medium cursor-pointer text-error"
                    data-tooltip-id={course.id}
                    data-tooltip-html={handleTooltipContent(
                        course.prerequisites
                    )}
                >
                    {course.prerequisites
                        .map((prerequisite) => prerequisite.id.split("4203")[1])
                        .join(", ") + "(a)"}
                    <ReactTooltip
                        id={course.id}
                        style={{
                            maxWidth: "500px",
                            backgroundColor: "#f3f3f3",
                            boxShadow: "0 0 5px #333",
                        }}
                    />
                </td>
            ) : (
                <td></td>
            )}
            <td>{course.credit}</td>
            <td>{course.theoryCredit}</td>
            <td>{course.practicalCredit}</td>
            <td>{course.electiveGroup}</td>
            <td>{course.credit}</td>
            <td>{course.isPass ? <Success text="" /> : <Fail text="" />}</td>
        </tr>
    );
};

export default TableItem;

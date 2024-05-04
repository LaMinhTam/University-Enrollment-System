import CheckIcon from "@mui/icons-material/Check";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IEducationPrograms } from "../../types/educationProgramType";
interface TableItemProps {
    course: IEducationPrograms;
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
        <tr>
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
            <td></td>
            <td></td>
            <td>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                    <CheckIcon />
                </span>
            </td>
        </tr>
    );
};

export default TableItem;

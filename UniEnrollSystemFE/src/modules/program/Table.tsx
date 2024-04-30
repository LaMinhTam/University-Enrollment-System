import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { IEducationPrograms } from "../../types/educationProgramType";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
import { COURSE_TYPE } from "../../constants/global";
const Table = ({
    programData,
}: {
    programData: {
        [key: string]: IEducationPrograms[];
    } | null;
}) => {
    console.log("Table ~ programData:", programData);
    const [show, setShow] = useState<number | null>(null);
    const handleCalculateCreditOfSemester = (semester: string) => {
        if (!programData) return 0;
        let credit = 0;
        programData[semester].forEach((course) => {
            credit += course.credit;
        });
        return credit;
    };
    const handleCalculateTotalCredit = () => {
        if (!programData) return 0;
        let credit = 0;
        Object.keys(programData).forEach((semester) => {
            programData[semester].forEach((course) => {
                credit += course.credit;
            });
        });
        return credit;
    };

    const handleCalculateTotalCreditOfTypeAtSemester = (
        type: number,
        semester: number
    ) => {
        if (!programData) return 0;
        let credit = 0;
        programData[semester].forEach((course) => {
            if (course.type === type) {
                credit += course.credit;
            }
        });
        return credit;
    };

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

    if (!programData) return null;
    return (
        <table className="mt-5 border border-collapse border-text2">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên môn học / Học phần</th>
                    <th>Mã học phần</th>
                    <th>Học phần</th>
                    <th>Số tín chỉ</th>
                    <th>Số tín chỉ lý thuyết</th>
                    <th>Số tín chỉ thực hành</th>
                    <th>Nhóm tự chọn</th>
                    <th>Số tín chỉ bắt buộc của nhóm</th>
                    <th>Đạt</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(programData).map((key, index) => (
                    <>
                        <tr
                            className="trSemester"
                            key={key}
                            onClick={() =>
                                setShow(show === index ? null : index)
                            }
                        >
                            <td colSpan={4}>Học kỳ {key}</td>
                            <td>{handleCalculateCreditOfSemester(key)}</td>
                            <td colSpan={5}></td>
                        </tr>
                        {show !== null && show === index && (
                            <>
                                <tr className="trSemester">
                                    <td colSpan={4}>Học phần bắt buộc</td>
                                    <td>
                                        {handleCalculateTotalCreditOfTypeAtSemester(
                                            COURSE_TYPE.MANDATORY,
                                            Number(key)
                                        )}
                                    </td>
                                    <td colSpan={5}></td>
                                </tr>
                                {programData[Object.keys(programData)[show]]
                                    .filter(
                                        (course) =>
                                            course.type ===
                                            COURSE_TYPE.MANDATORY
                                    )
                                    .map((course, index) => (
                                        <tr key={uuidv4()}>
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
                                                            maxWidth: "500px",
                                                            backgroundColor:
                                                                "#f3f3f3",
                                                            boxShadow:
                                                                "0 0 5px #333",
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
                                    ))}
                                {handleCalculateTotalCreditOfTypeAtSemester(
                                    0,
                                    Number(key)
                                ) > 0 && (
                                    <>
                                        <tr className="trSemester">
                                            <td colSpan={4}>
                                                Học phần tự chọn
                                            </td>
                                            <td>
                                                {handleCalculateTotalCreditOfTypeAtSemester(
                                                    COURSE_TYPE.OPTIONAL,
                                                    Number(key)
                                                )}
                                            </td>
                                            <td colSpan={5}></td>
                                        </tr>
                                        {programData[
                                            Object.keys(programData)[show]
                                        ]
                                            .filter(
                                                (course) =>
                                                    course.type ===
                                                    COURSE_TYPE.OPTIONAL
                                            )
                                            .map((course, index) => (
                                                <tr key={uuidv4()}>
                                                    <td>{index + 1}</td>
                                                    <td>{course.name}</td>
                                                    <td>{course.id}</td>
                                                    {course.prerequisites
                                                        .length > 0 ? (
                                                        <td
                                                            className="text-sm font-medium cursor-pointer text-error"
                                                            data-tooltip-id={
                                                                course.id
                                                            }
                                                            data-tooltip-html={handleTooltipContent(
                                                                course.prerequisites
                                                            )}
                                                        >
                                                            {course.prerequisites
                                                                .map(
                                                                    (
                                                                        prerequisite
                                                                    ) =>
                                                                        prerequisite.id.split(
                                                                            "4203"
                                                                        )[1]
                                                                )
                                                                .join(", ") +
                                                                "(a)"}
                                                            <ReactTooltip
                                                                id={course.id}
                                                                style={{
                                                                    maxWidth:
                                                                        "500px",
                                                                    backgroundColor:
                                                                        "#f3f3f3",
                                                                    boxShadow:
                                                                        "0 0 5px #333",
                                                                }}
                                                            />
                                                        </td>
                                                    ) : (
                                                        <td></td>
                                                    )}
                                                    <td>{course.credit}</td>
                                                    <td>
                                                        {course.theoryCredit}
                                                    </td>
                                                    <td>
                                                        {course.practicalCredit}
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                                            <CheckIcon />
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                    </>
                                )}
                            </>
                        )}
                    </>
                ))}
                <tr className="trSemester">
                    <td colSpan={4}>Tổng tín chỉ yêu cầu</td>
                    <td
                        style={{
                            color: "red",
                        }}
                    >
                        {handleCalculateTotalCredit()}
                    </td>
                    <td colSpan={5}></td>
                </tr>
                <tr className="trSemester">
                    <td colSpan={4}>Tổng tín chỉ bắt buộc</td>
                    <td
                        style={{
                            color: "red",
                        }}
                    >
                        106
                    </td>
                    <td colSpan={5}></td>
                </tr>
                <tr className="trSemester">
                    <td colSpan={4}>Tổng tín chỉ tự chọn</td>
                    <td
                        style={{
                            color: "red",
                        }}
                    >
                        32
                    </td>
                    <td colSpan={5}></td>
                </tr>
            </tbody>
        </table>
    );
};

export default Table;

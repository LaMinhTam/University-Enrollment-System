import { useState } from "react";
import { IEducationPrograms } from "../../types/educationProgramType";
import { v4 as uuidv4 } from "uuid";
import { COURSE_TYPE } from "../../constants/global";
import TableItem from "./TableItem";
import TableInfo from "./TableInfo";
const Table = ({
    programData,
}: {
    programData: {
        [key: string]: IEducationPrograms[];
    } | null;
}) => {
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
                                        <TableItem
                                            key={uuidv4()}
                                            course={course}
                                            handleTooltipContent={
                                                handleTooltipContent
                                            }
                                            index={index}
                                        />
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
                                                <TableItem
                                                    key={uuidv4()}
                                                    course={course}
                                                    handleTooltipContent={
                                                        handleTooltipContent
                                                    }
                                                    index={index}
                                                />
                                            ))}
                                    </>
                                )}
                            </>
                        )}
                    </>
                ))}
                <TableInfo
                    handleCalculateTotalCredit={handleCalculateTotalCredit}
                />
            </tbody>
        </table>
    );
};

export default Table;

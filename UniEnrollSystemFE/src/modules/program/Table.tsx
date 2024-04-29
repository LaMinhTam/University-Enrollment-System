import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { IEducationPrograms } from "../../types/educationProgramType";
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
                        {show !== null &&
                            show === index &&
                            programData[Object.keys(programData)[show]].map(
                                (course, index) => (
                                    <tr key={course.id}>
                                        <td>{index + 1}</td>
                                        <td>{course.name}</td>
                                        <td>{course.id}</td>
                                        <td></td>
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
                                )
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

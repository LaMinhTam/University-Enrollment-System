import { IStudyResult } from "../../types/studyResultType";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import handleFormatScore from "../../utils/handleFormatScore";
import { Fail, Success } from "../../components/common";
const TableBody = ({
    isOpenCalculatePointFeature,
    studyResults,
}: {
    isOpenCalculatePointFeature: boolean;
    studyResults: IStudyResult[];
}) => {
    const handleFormatTheoryScores = (scores: number[]) => {
        if (scores.length === 0) return Array(9).fill("");
        else {
            const newScores = scores.concat(Array(9 - scores.length).fill(""));
            return newScores;
        }
    };
    const handleFormatPracticalScores = (scores: number[]) => {
        if (scores.length === 0) return Array(5).fill("");
        else {
            const newScores = scores.concat(Array(5 - scores.length).fill(""));
            return newScores;
        }
    };
    const handleFormatGrade = (score: number) => {
        if (score >= 9) return "A+";
        if (score >= 8.5) return "A";
        if (score >= 8) return "B+";
        if (score >= 7) return "B";
        if (score >= 6) return "C+";
        if (score >= 5.5) return "C";
        if (score >= 5) return "D+";
        if (score >= 4) return "D";
        return "F";
    };
    const handleFormatStringGrade = (score: number) => {
        if (score >= 9) return "Xuất sắc";
        if (score >= 8.5) return "Giỏi";
        if (score >= 8) return "Khá";
        if (score >= 7) return "Khá";
        if (score >= 6) return "Trung Bình";
        if (score >= 5.5) return "Trung Bình";
        if (score >= 5) return "TB Yếu";
        if (score >= 4) return "Kém";
        return "F";
    };
    const handleChange10To4 = (score: number) => {
        if (score >= 9) return 4;
        if (score >= 8.5) return 3.7;
        if (score >= 8) return 3.3;
        if (score >= 7) return 3;
        if (score >= 6.5) return 2.7;
        if (score >= 6) return 2.3;
        if (score >= 5.5) return 2;
        if (score >= 5) return 1.7;
        if (score >= 4.5) return 1.3;
        if (score >= 4) return 1;
        return 0;
    };
    if (!studyResults) return null;
    return (
        <tbody>
            {studyResults.map((result) => (
                <React.Fragment key={uuidv4()}>
                    <tr>
                        <td
                            className="font-bold text-text7 bg-text8"
                            colSpan={28}
                        >
                            {`HK${result.semester} (${result.year} - ${
                                result.year + 1
                            })`}
                        </td>
                    </tr>
                    {result.gradeReports.map((item, index) => (
                        <tr key={uuidv4()}>
                            <td>{index + 1}</td>
                            <td>{item.classId}</td>
                            <td>{item.courseName}</td>
                            <td>{item.credit}</td>
                            <td contentEditable={isOpenCalculatePointFeature}>
                                {handleFormatScore(item.midtermScore)}
                            </td>
                            <td
                                contentEditable={isOpenCalculatePointFeature}
                            ></td>
                            {handleFormatTheoryScores(item.theoryScores).map(
                                (score) => (
                                    <td
                                        contentEditable={
                                            isOpenCalculatePointFeature
                                        }
                                        key={uuidv4()}
                                    >
                                        {handleFormatScore(score)}
                                    </td>
                                )
                            )}
                            {handleFormatPracticalScores(
                                item.practicalScores
                            ).map((score) => (
                                <td
                                    contentEditable={
                                        isOpenCalculatePointFeature
                                    }
                                    key={uuidv4()}
                                >
                                    {handleFormatScore(score)}
                                </td>
                            ))}
                            <td contentEditable={isOpenCalculatePointFeature}>
                                {item.finalScore}
                            </td>
                            <td>{handleFormatScore(item.overallScore)}</td>
                            <td>{handleChange10To4(item.overallScore)}</td>
                            <td>{handleFormatGrade(item.overallScore)}</td>
                            <td>
                                {handleFormatStringGrade(item.overallScore)}
                            </td>
                            <td></td>
                            <td></td>
                            <td>
                                {item.status === "PASSED" ? (
                                    <Success text="" />
                                ) : (
                                    <Fail text="" />
                                )}
                            </td>
                        </tr>
                    ))}
                    <tr className="trSemesterInfo">
                        <td colSpan={2}>
                            Điểm trung bình học kỳ hệ 10:{" "}
                            {handleFormatScore(result.GPA)}
                        </td>
                        <td colSpan={2}>
                            Điểm trung bình học kỳ hệ 4:{" "}
                            {handleFormatScore(result.GPA4)}
                        </td>
                    </tr>
                    <tr className="trSemesterInfo">
                        <td colSpan={2}>
                            Điểm trung bình tích lũy:{" "}
                            {handleFormatScore(result.accumulatedGPA)}
                        </td>
                        <td colSpan={2}>
                            Điểm trung bình tích lũy (hệ 4):{" "}
                            {handleFormatScore(result.accumulatedGPA4)}
                        </td>
                    </tr>
                    <tr className="trSemesterInfo">
                        <td colSpan={2}>
                            Tổng số tín chỉ đã đăng ký: {result.totalCredits}
                        </td>
                        <td colSpan={2}>
                            Tổng số tín chỉ tích lũy:{" "}
                            {result.accumulatedCredits}
                        </td>
                    </tr>
                    <tr className="trSemesterInfo">
                        <td colSpan={2}>
                            Tổng số tín chỉ đạt: {result.totalPassedCredits}
                        </td>
                        <td colSpan={2}>
                            Tổng số tín chỉ nợ tính đến hiện tại: 0
                        </td>
                    </tr>
                    <tr className="trSemesterInfo">
                        <td colSpan={2}>
                            Xếp loại học lực tích lũy:{" "}
                            {handleFormatStringGrade(result.GPA)}
                        </td>
                        <td colSpan={2}>
                            Xếp loại học lực học kỳ:{" "}
                            {handleFormatStringGrade(result.GPA)}
                        </td>
                    </tr>
                </React.Fragment>
            ))}
        </tbody>
    );
};

export default TableBody;

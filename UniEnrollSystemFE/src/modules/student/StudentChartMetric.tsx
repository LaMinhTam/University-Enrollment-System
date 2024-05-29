import { ChangeEvent, useEffect, useState } from "react";
import { IMetric } from "../../types/commonType";
import { IStudyResult } from "../../types/studyResultType";
import { UniEnrollSystemAPI } from "../../apis/constants";
import { Loading } from "../../components/common";
import GradeStatisticsChart from "./GradeStatisticsChart";
import CreditProgressChart from "./CreditProgressChart";

const StudentChartMetric = () => {
    const [loadingMetric, setLoadingMetric] = useState<boolean>(false);
    const [loadingProgram, setLoadingProgram] = useState<boolean>(false);
    const [metrics, setMetrics] = useState<IMetric>({} as IMetric);
    const [programs, setPrograms] = useState<IStudyResult>({} as IStudyResult);
    const [loadingCredit, setLoadingCredit] = useState<boolean>(false);
    const [learnedCredits, setLearnedCredits] = useState<{
        totalEarnedCredits: number;
        totalRequiredCredits: number;
    }>({ totalEarnedCredits: 0, totalRequiredCredits: 0 });

    useEffect(() => {
        async function fetchLearnedCredits() {
            try {
                setLoadingCredit(true);
                const response = await UniEnrollSystemAPI.getLearnedCredit();
                if (response.data) {
                    setLearnedCredits(response.data);
                    setLoadingCredit(false);
                }
            } catch (error) {
                setLoadingCredit(false);
                console.log("Error: ", error);
            }
        }
        if (learnedCredits.totalEarnedCredits === 0) fetchLearnedCredits();
    }, [learnedCredits.totalEarnedCredits]);

    const handleSelectedMetric = async (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "0") return;
        try {
            setLoadingMetric(true);
            const [semester, year] = e.target.value.split("-");
            const response = await UniEnrollSystemAPI.getStatisticsBySemester(
                Number(semester),
                Number(year)
            );
            if (response.data) {
                const formattedAverages = response.data.averages.map((score) =>
                    Number(score.toFixed(2))
                );

                const formattedGrades = response.data.grades.map((score) =>
                    Number(score.toFixed(2))
                );

                setMetrics({
                    ...response.data,
                    averages: formattedAverages,
                    grades: formattedGrades,
                });
            }
            setLoadingMetric(false);
            setLoadingMetric(false);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const handleSelectedProgram = async (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "0") return;
        try {
            setLoadingProgram(true);
            const [semester, year] = e.target.value.split("-");
            const response = await UniEnrollSystemAPI.getStudyResultBySemester(
                Number(semester),
                Number(year)
            );
            if (response.data) {
                setPrograms(response.data);
            }
            setLoadingProgram(false);
        } catch (error) {
            setLoadingProgram(false);
            console.log("Error: ", error);
        }
    };

    return (
        <div className="md:flex block items-center justify-center md:h-[346px] h-full mt-5">
            <div className="w-full md:h-full h-[346px] p-[10px] bg-lite rounded-lg mb-[15px] md:mb-0">
                <div className="flex items-center justify-center h-[52px] border-b border-b-text3">
                    <span className="mr-auto text-lg font-bold">
                        Kết quả học tập
                    </span>
                    <select
                        name="sltSemesterMetric"
                        id="sltSemesterMetric"
                        onChange={(e) => handleSelectedMetric(e)}
                        className="px-3 py-[6px] border border-text3 rounded-md w-full max-w-[180px]"
                    >
                        <option value="0">Chọn học kỳ</option>
                        <option value="3-2024">HK3 (2024-2025)</option>
                        <option value="2-2024">HK2 (2024-2025)</option>
                        <option value="1-2024">HK1 (2024-2025)</option>
                        <option value="3-2023">HK3 (2023-2024)</option>
                        <option value="2-2023">HK2 (2023-2024)</option>
                        <option value="1-2023">HK1 (2023-2024)</option>
                        <option value="3-2022">HK3 (2022-2023)</option>
                        <option value="2-2022">HK2 (2022-2023)</option>
                        <option value="1-2022">HK1 (2022-2023)</option>
                        <option value="3-2021">HK3 (2021-2022)</option>
                        <option value="2-2021">HK2 (2021-2022)</option>
                        <option value="1-2021">HK1 (2021-2022)</option>
                    </select>
                </div>
                {loadingMetric ? (
                    <Loading />
                ) : (
                    <div className="w-full h-full mt-5">
                        {metrics && metrics?.averages?.length > 0 ? (
                            <GradeStatisticsChart data={metrics} />
                        ) : (
                            <img src="/tkkqht.png" alt="" />
                        )}
                    </div>
                )}
            </div>
            <div
                className="md:mx-5 flex flex-col items-center justify-center 
            w-full md:h-full h-[346px] bg-lite md:max-w-[240px] p-[10px] mb-[15px] md:mb-0"
            >
                <div className="flex items-center justify-center h-[52px] border-b border-b-text3">
                    <span className="text-lg font-bold">Tiến độ học tập</span>
                </div>
                <div className="my-auto">
                    {loadingCredit ? (
                        <Loading />
                    ) : (
                        <CreditProgressChart data={learnedCredits} />
                    )}
                </div>
                <span className="text-lg font-bold">
                    {learnedCredits.totalEarnedCredits}/
                    {learnedCredits.totalRequiredCredits}
                </span>
            </div>
            <div className="w-full md:h-full h-[346px] p-[10px] bg-lite rounded-lg md:mb-0 mb-8">
                <div className="flex items-center justify-center h-[52px] border-b border-b-text3">
                    <span className="mr-auto text-lg font-bold">
                        Lớp học phần
                    </span>
                    <select
                        name="sltSemesterProgram"
                        id="sltSemesterProgram"
                        onChange={(e) => handleSelectedProgram(e)}
                        className="px-3 py-[6px] border border-text3 rounded-md w-full max-w-[180px]"
                    >
                        <option value="0">Chọn học kỳ</option>
                        <option value="3-2024">HK3 (2024-2025)</option>
                        <option value="2-2024">HK2 (2024-2025)</option>
                        <option value="1-2024">HK1 (2024-2025)</option>
                        <option value="3-2023">HK3 (2023-2024)</option>
                        <option value="2-2023">HK2 (2023-2024)</option>
                        <option value="1-2023">HK1 (2023-2024)</option>
                        <option value="3-2022">HK3 (2022-2023)</option>
                        <option value="2-2022">HK2 (2022-2023)</option>
                        <option value="1-2022">HK1 (2022-2023)</option>
                        <option value="3-2021">HK3 (2021-2022)</option>
                        <option value="2-2021">HK2 (2021-2022)</option>
                        <option value="1-2021">HK1 (2021-2022)</option>
                    </select>
                </div>
                {loadingProgram ? (
                    <Loading />
                ) : (
                    <div className="w-full h-full mb-5">
                        {programs && programs?.gradeReports?.length > 0 ? (
                            <>
                                <div className="flex items-center justify-between py-4 border-b border-b-text3">
                                    <span>Môn học/học phần</span>
                                    <span>Số tín chỉ</span>
                                </div>
                                <div className="w-full h-[220px] overflow-y-scroll">
                                    {programs.gradeReports.map(
                                        (report, index) => (
                                            <div
                                                key={report.classId}
                                                className={`flex text-text2 font-semibold items-center justify-between py-4 border-b border-b-text3 ${
                                                    index % 2 === 0
                                                        ? "bg-text8"
                                                        : "bg-lite"
                                                }`}
                                            >
                                                <div className="flex flex-col items-start justify-center gap-x-2">
                                                    <span className="font-bold text-tertiary">
                                                        {report.classId}
                                                    </span>
                                                    <span>
                                                        {report.courseName}
                                                    </span>
                                                </div>
                                                <span>{report.credit}</span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </>
                        ) : (
                            <img src="/tkkqht.png" alt="" />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentChartMetric;

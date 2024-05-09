import { useEffect, useState } from "react";
import Toggle from "../components/toogle";
import useToggleValue from "../hooks/useToggleValue";
import TableBody from "../modules/study/TableBody";
import TableHeader from "../modules/study/TableHeader";
import RequiredAuthPage from "./RequiredAuthPage";
import { UniEnrollSystemAPI } from "../apis/constants";
import { IStudyResult } from "../types/studyResultType";
import { toast } from "react-toastify";

const StudyResultPage = () => {
    const {
        value: isOpenCalculatePointFeature,
        handleToggleValue: setIsOpenCalculatePointFeature,
    } = useToggleValue(false);

    const [studyResults, setStudyResults] = useState<IStudyResult[]>([]);
    console.log("StudyResultPage ~ studyResults:", studyResults);
    useEffect(() => {
        async function fetchStudyResult() {
            try {
                const results = await UniEnrollSystemAPI.getStudyResults();
                if (results.status === 200) {
                    setStudyResults(results.data);
                } else {
                    toast.error("Lỗi khi lấy dữ liệu kết quả học tập");
                }
            } catch (error) {
                toast.error("Lỗi khi lấy dữ liệu kết quả học tập");
            }
        }
        fetchStudyResult();
    }, []);
    return (
        <RequiredAuthPage>
            <div className="w-full p-2">
                <div className="w-full shadow-md bg-lite p-[10px]">
                    <div className="flex items-center justify-start gap-x-[100px]">
                        <h1 className="text-lg font-bold">Kết quả học tập</h1>
                        <Toggle
                            checked={isOpenCalculatePointFeature}
                            text="Bật tính năng tính điểm"
                            onChange={setIsOpenCalculatePointFeature}
                        />
                    </div>
                    <table className="w-full mt-5 overflow-x-auto border border-collapse border-text2 tblStudyResult">
                        <TableHeader />
                        <TableBody
                            studyResults={studyResults}
                            isOpenCalculatePointFeature={
                                isOpenCalculatePointFeature
                            }
                        />
                    </table>
                </div>
            </div>
        </RequiredAuthPage>
    );
};

export default StudyResultPage;

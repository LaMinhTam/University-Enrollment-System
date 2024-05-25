import { useEffect, useState } from "react";
// import Toggle from "../components/toogle";
import useToggleValue from "../hooks/useToggleValue";
import TableBody from "../modules/study/TableBody";
import TableHeader from "../modules/study/TableHeader";
import RequiredAuthPage from "./RequiredAuthPage";
import { UniEnrollSystemAPI } from "../apis/constants";
import { IStudyResult } from "../types/studyResultType";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setIsOpenPredictScholarshipModal } from "../store/actions/modalSlice";
import { Loading } from "../components/common";

const StudyResultPage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const {
        value: isOpenCalculatePointFeature,
        handleToggleValue: setIsOpenCalculatePointFeature,
    } = useToggleValue(false);

    const [studyResults, setStudyResults] = useState<IStudyResult[]>([]);
    useEffect(() => {
        async function fetchStudyResult() {
            setLoading(true);
            try {
                const results = await UniEnrollSystemAPI.getStudyResults();
                if (results.status === 200) {
                    setLoading(false);
                    setStudyResults(results.data);
                } else {
                    setLoading(false);
                    toast.error("Lỗi khi lấy dữ liệu kết quả học tập");
                }
            } catch (error) {
                setLoading(false);
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
                        {/* <Toggle
                            checked={isOpenCalculatePointFeature}
                            text="Bật tính năng tính điểm"
                            onChange={setIsOpenCalculatePointFeature}
                        /> */}
                        <button
                            onClick={() =>
                                dispatch(setIsOpenPredictScholarshipModal(true))
                            }
                            className="px-4 py-2 text-center rounded bg-primary text-lite hover:bg-tertiary"
                        >
                            Ước lượng học bổng
                        </button>
                    </div>
                    {loading ? (
                        <div className="flex items-center justify-center w-full h-screen mt-10">
                            <Loading />
                        </div>
                    ) : (
                        <table className="w-full mt-5 overflow-x-auto border border-collapse border-text2 tblStudyResult">
                            <TableHeader />
                            <TableBody
                                studyResults={studyResults}
                                isOpenCalculatePointFeature={
                                    isOpenCalculatePointFeature
                                }
                            />
                        </table>
                    )}
                </div>
            </div>
        </RequiredAuthPage>
    );
};

export default StudyResultPage;

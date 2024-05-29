import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useDispatch } from "react-redux";
import { setIsOpenPredictScholarshipModal } from "../../store/actions/modalSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loading } from "../common";
import { UniEnrollSystemAPI } from "../../apis/constants";
const PredictScholarshipModal = () => {
    const dispatch = useDispatch();
    const [gpa, setGpa] = useState<number>(0);
    const [period, setPeriod] = useState<string>("0");
    const [loading, setLoading] = useState<boolean>(false);
    const [predictResult, setPredictResult] = useState<number>(0);
    const handlePredictScholarship = async () => {
        if (gpa === 0 || period === "0") {
            toast.error("Vui lòng nhập đủ thông tin!");
            return;
        } else {
            const [semester, year] = period.split("-");
            try {
                setLoading(true);
                const response = await UniEnrollSystemAPI.getPredictScholarship(
                    Number(semester),
                    Number(year),
                    gpa
                );
                if (response.status === 200) {
                    setLoading(false);
                    setPredictResult(response.data);
                }
            } catch (error) {
                console.error("Đã có lỗi xảy ra vui lòng thử lại sau!");
                setLoading(false);
            }
        }
    };
    return (
        <div className="w-[1000px] h-full flex flex-col rounded-lg">
            <div className="flex items-center w-full h-[48px] p-2 bg-strock">
                <div className="w-full px-2 font-bold border-l-4 border-l-error text-text7">
                    Dự đoán học bổng
                </div>
                <button
                    onClick={() => {
                        dispatch(setIsOpenPredictScholarshipModal(false));
                    }}
                    className="flex items-center justify-center w-8 h-8 mb-1 rounded-full hover:bg-text3 hover:bg-opacity-10"
                >
                    <CloseRoundedIcon />
                </button>
            </div>
            <div className="p-3">
                <div className="flex items-center justify-center mb-10 gap-x-5">
                    <select
                        name="sltSemester"
                        id="sltSemester"
                        className="py-[6px] px-3 border border-text2 w-[260px]"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                    >
                        <option value="0">Chọn học kỳ</option>
                        <option value="2-2024">Học kỳ 2 (2024-2025)</option>
                        <option value="1-2024">Học kỳ 1 (2024-2025)</option>
                        <option value="2-2023">Học kỳ 2 (2023-2024)</option>
                        <option value="1-2023">Học kỳ 1 (2023-2024)</option>
                        <option value="2-2022">Học kỳ 2 (2022-2023)</option>
                        <option value="1-2022">Học kỳ 1 (2022-2023)</option>
                        <option value="2-2021">Học kỳ 2 (2021-2022)</option>
                        <option value="1-2021">Học kỳ 1 (2021-2022)</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Nhập vào GPA (hệ 10)"
                        className="w-full border-b border-b-tertiary text-text1 max-w-[250px] p-2"
                        onChange={(e) => setGpa(Number(e.target.value))}
                    />
                    <button
                        className="px-4 py-2 font-semibold text-white rounded bg-primary"
                        onClick={handlePredictScholarship}
                    >
                        Dự đoán
                    </button>
                </div>
                <div>
                    {loading ? (
                        <Loading />
                    ) : (
                        <p>
                            Mức học bổng dự kiến:{" "}
                            <strong className="font-bold text-text7">
                                {predictResult}%
                            </strong>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PredictScholarshipModal;

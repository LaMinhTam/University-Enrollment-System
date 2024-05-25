import { useEffect, useState } from "react";
import Header from "../modules/debt/Header";
import Table from "../modules/debt/Table";
import RequiredAuthPage from "./RequiredAuthPage";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { toast } from "react-toastify";
import { UniEnrollSystemAPI } from "../apis/constants";
import { IDept } from "../types/debtTypes";
import { Loading } from "../components/common";

const StudentDebtPage = () => {
    const debtTime = useSelector((state: RootState) => state.debt.debtTime);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<{ [key: string]: IDept[] }>({});
    useEffect(() => {
        async function fetchStudentDebt() {
            try {
                setLoading(true);
                if (debtTime === "0") {
                    const response = await UniEnrollSystemAPI.getStudentDebt(
                        1,
                        100
                    );
                    if (response.status === 200) {
                        setLoading(false);
                        setData(response.data);
                    } else {
                        toast.error("Lỗi khi lấy thông tin nợ học phí");
                        setLoading(false);
                    }
                } else {
                    const [semester, year] = debtTime.split("-");
                    const response =
                        await UniEnrollSystemAPI.getStudentDeptBySemester(
                            parseInt(semester),
                            parseInt(year)
                        );
                    if (response.status === 200) {
                        setLoading(false);
                        const newData: { [key: string]: IDept[] } = {};
                        response.data.forEach((item) => {
                            const key = `${item.semester}-${item.year}`;
                            if (!newData[key]) {
                                newData[key] = [];
                            }
                            newData[key].push(item);
                        });
                        setData(newData);
                    } else {
                        toast.error("Lỗi khi lấy thông tin nợ học phí");
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
                toast.error("Lỗi khi lấy thông tin nợ học phí");
            }
        }
        if (debtTime) {
            fetchStudentDebt();
        }
    }, [debtTime]);

    return (
        <RequiredAuthPage>
            <div className="w-full p-2">
                <div className="w-full shadow-md bg-lite p-[10px]">
                    <Header />
                    {loading ? <Loading /> : <Table data={data} />}
                </div>
            </div>
        </RequiredAuthPage>
    );
};

export default StudentDebtPage;

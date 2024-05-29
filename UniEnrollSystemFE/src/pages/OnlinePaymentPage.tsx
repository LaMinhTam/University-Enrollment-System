import { useEffect, useState } from "react";
import Body from "../modules/payment/Body";
import Header from "../modules/payment/Header";
import RequiredAuthPage from "./RequiredAuthPage";
import { UniEnrollSystemAPI } from "../apis/constants";
import { IDept } from "../types/debtTypes";
import { Loading } from "../components/common";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    setCheckedPaymentParams,
    setIsOpenCheckedPaymentModal,
} from "../store/actions/modalSlice";
import { RootState } from "../store/configureStore";
import { toast } from "react-toastify";
const OnlinePaymentPage = () => {
    const dispatch = useDispatch();
    const paymentTime = useSelector(
        (state: RootState) => state.payment.paymentTime
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [studentDebt, setStudentDebt] = useState<{
        [key: string]: IDept[];
    } | null>(null);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const success = params.get("success");
    const restOfQueryString = location.search.replace(
        "?success=" + success,
        ""
    );
    useEffect(() => {
        if (success === "true" && restOfQueryString !== "") {
            dispatch(setIsOpenCheckedPaymentModal(true));
            dispatch(setCheckedPaymentParams(restOfQueryString));
        }
    }, [dispatch, restOfQueryString, success]);

    useEffect(() => {
        async function fetchStudentDebt() {
            try {
                setLoading(true);
                if (paymentTime === "0") {
                    const response = await UniEnrollSystemAPI.getStudentDebt(
                        1,
                        10000
                    );
                    if (response.status === 200) {
                        setLoading(false);
                        setStudentDebt(response.data);
                    } else {
                        console.error("Lỗi khi lấy thông tin nợ học phí");
                        setLoading(false);
                    }
                } else {
                    const [semester, year] = paymentTime.split("-");
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
                        setStudentDebt(newData);
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
        if (paymentTime) {
            fetchStudentDebt();
        }
    }, [paymentTime]);
    return (
        <RequiredAuthPage>
            <div className="w-full h-full p-3 mt-5 shadow-md select-none bg-lite max-w-[1140px] mx-auto">
                <Header />
                <hr className="my-2" />
                {loading ? <Loading /> : <Body studentDept={studentDebt} />}
            </div>
        </RequiredAuthPage>
    );
};

export default OnlinePaymentPage;

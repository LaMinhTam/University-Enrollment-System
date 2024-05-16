import { useEffect, useState } from "react";
import Body from "../modules/payment/Body";
import Header from "../modules/payment/Header";
import RequiredAuthPage from "./RequiredAuthPage";
import { UniEnrollSystemAPI } from "../apis/constants";
import { IDept } from "../types/debtTypes";
import { Loading } from "../components/common";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    setCheckedPaymentParams,
    setIsOpenCheckedPaymentModal,
} from "../store/actions/modalSlice";
const OnlinePaymentPage = () => {
    const dispatch = useDispatch();
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
                const response = await UniEnrollSystemAPI.getStudentDebt();
                if (response.status === 200) {
                    setLoading(false);
                    setStudentDebt(response.data);
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
        fetchStudentDebt();
    }, []);
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

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { getPaymentInfo, savePaymentInfo } from "../../utils/auth";
import { IDept } from "../../types/debtTypes";
import handleFormatMoney from "../../utils/handleFormatMoney";
import Swal from "sweetalert2";
import { useState } from "react";
import {
    setCheckedPaymentParams,
    setIsOpenCheckedPaymentModal,
} from "../../store/actions/modalSlice";
import { toast } from "react-toastify";
import { UniEnrollSystemAPI } from "../../apis/constants";
import { useNavigate } from "react-router-dom";
import { Loading } from "../common";
import { setPaymentTime } from "../../store/actions/paymentSlice";
const PaymentCheckModal = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const paymentCheckedParams = useSelector(
        (state: RootState) => state.modal.checkedPaymentParams
    );
    const paymentInfo: IDept[] = getPaymentInfo();
    const handleAcceptPayment = async () => {
        const result = await Swal.fire({
            title: "Xác nhận thanh toán",
            text: "Bạn có chắc chắn muốn thanh toán?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có, tôi chắc chắn!",
            cancelButtonText: "Không, hủy bỏ!",
        });
        if (result.isConfirmed) {
            try {
                setLoading(true);
                const response = await UniEnrollSystemAPI.checkPayment(
                    paymentCheckedParams
                );
                if (response.status === 200) {
                    setLoading(false);
                    toast.success("Thanh toán thành công!");
                    savePaymentInfo("");
                    dispatch(setIsOpenCheckedPaymentModal(false));
                    dispatch(setCheckedPaymentParams(""));
                    dispatch(setPaymentTime("0"));
                    navigate("/thanh-toan-truc-tuyen");
                } else if (response.status === 403) {
                    setLoading(false);
                    toast.error(response.message);
                } else if (response.status === 400) {
                    setLoading(false);
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error("Dịch vụ đang bận, vui lòng thử lại sau!");
                setLoading(false);
            }
        }
    };
    return (
        <div className="md:w-[1000px] h-full flex flex-col rounded-lg">
            <div className="flex items-center w-full h-[48px] p-2 bg-strock">
                <div className="w-full px-2 font-bold border-l-4 border-l-error text-text7">
                    Kiểm tra thanh toán
                </div>
            </div>
            <div className="p-3 mt-5">
                <table className="w-full border border-collapse border-text2 table-payment">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã</th>
                            <th>Môn học</th>
                            <th>Số tiền (VND)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentInfo?.map((debt, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{debt.classId}</td>
                                <td>{debt.courseName}</td>
                                <td>{handleFormatMoney(debt.amount)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td
                                colSpan={3}
                                className="font-bold text-end text-text2"
                            >
                                Tổng thanh toán:
                            </td>
                            <td>
                                {handleFormatMoney(
                                    paymentInfo?.reduce(
                                        (total, debt) => total + debt.amount,
                                        0
                                    )
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex items-center justify-end mt-5 gap-x-5">
                    <button
                        className="px-4 py-2 rounded text-lite bg-primary hover:bg-tertiary"
                        disabled={loading}
                        onClick={handleAcceptPayment}
                    >
                        {loading ? <Loading /> : "Xác nhận"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCheckModal;

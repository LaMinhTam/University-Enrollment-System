import { Link } from "react-router-dom";
import { Loading, Success } from "../../components/common";
import { IDept } from "../../types/debtTypes";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { UniEnrollSystemAPI } from "../../apis/constants";
import { savePaymentInfo } from "../../utils/auth";
import handleFormatMoney from "../../utils/handleFormatMoney";

const Body = ({
    studentDept,
}: {
    studentDept: {
        [key: string]: IDept[];
    } | null;
}) => {
    const [selectedDebts, setSelectedDebts] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCalculateTotalDebt = () => {
        if (!studentDept) return 0;
        let total = 0;
        Object.values(studentDept).forEach((debtList) => {
            debtList.forEach((debt) => {
                if (selectedDebts.includes(debt.classId)) {
                    total += debt.amount;
                }
            });
        });
        return total;
    };

    const handleSelectDebt = (
        e: ChangeEvent<HTMLInputElement>,
        debt: IDept
    ) => {
        if (e.target.checked) {
            const isExist = selectedDebts.includes(debt.classId);
            if (!isExist) {
                setSelectedDebts([...selectedDebts, debt.classId]);
            }
        } else {
            setSelectedDebts(
                selectedDebts.filter((classId) => classId !== debt.classId)
            );
        }
    };

    const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const debtsList = Object.values(studentDept || {}).map((debtList) =>
                debtList.map((debt) => debt.classId)
            );
            setSelectedDebts(debtsList.flat());
        } else {
            setSelectedDebts([]);
        }
    };

    const handlePayment = async () => {
        const amount = handleCalculateTotalDebt();
        if (amount === 0 || selectedDebts.length <= 0) {
            toast.info("Vui lòng chọn học phần cần thanh toán");
            return;
        } else {
            try {
                setLoading(true);
                const response = await UniEnrollSystemAPI.createPayment(
                    amount,
                    selectedDebts
                );
                if (response.status === 200) {
                    setLoading(false);
                    const paymentInfo = Object.values(studentDept || {})
                        .map((debtList) =>
                            debtList.filter((debt) =>
                                selectedDebts.includes(debt.classId)
                            )
                        )
                        .flat();
                    savePaymentInfo(JSON.stringify(paymentInfo));
                    toast.success("Đang chuyển hướng đến trang thanh toán");

                    // localStorage.setItem("PaymentInfo", JSON.stringify())
                    window.location.href = response.data;
                } else {
                    console.error("Có lỗi xảy ra, vui lòng thử lại sau");
                }
            } catch (error) {
                setLoading(false);
                toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
            }
        }
    };
    return (
        <div>
            <table className="w-full mt-5 border border-collapse border-text2 table-payment">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={(e) => handleSelectAll(e)}
                            />
                        </th>
                        <th>STT</th>
                        <th>Mã</th>
                        <th>Nội dung thu</th>
                        <th>Tín chỉ</th>
                        <th>Bắt buộc</th>
                        <th>Số tiền (VND)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(studentDept || {})?.map((debtList) => {
                        return debtList
                            ?.filter((item) => item.status === "UNPAID")
                            .map((debt, index) => (
                                <tr key={index}>
                                    <td className="text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedDebts.includes(
                                                debt.classId
                                            )}
                                            onChange={(e) =>
                                                handleSelectDebt(e, debt)
                                            }
                                        />
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>{debt.classId}</td>
                                    <td>{debt.courseName}</td>
                                    <td>{debt.credit}</td>
                                    <td>
                                        <Success text="" />
                                    </td>
                                    <td>{handleFormatMoney(debt.amount)}</td>
                                </tr>
                            ));
                    })}
                    <tr>
                        <td
                            colSpan={6}
                            className="font-bold text-end text-text2"
                        >
                            Tổng thanh toán:
                        </td>
                        <td>{handleFormatMoney(handleCalculateTotalDebt())}</td>
                    </tr>
                    <tr>
                        <td colSpan={7} className="font-medium text-text2">
                            <p>
                                1. Để thanh toán trực tuyến qua ngân hàng {""}
                                <strong className="font-bold text-error">
                                    thẻ ATM
                                </strong>{" "}
                                phải đăng ký{" "}
                                <strong className="font-bold text-error">
                                    Thanh toán online
                                </strong>
                                .
                            </p>
                            <p>
                                2. Vui lòng kiểm tra{" "}
                                <strong className="font-bold text-error">
                                    HẠN MỨC THẺ
                                </strong>{" "}
                                trước khi thanh toán
                            </p>
                            <p>
                                3. Xem hướng dẫn thanh toán{" "}
                                <Link
                                    target="_blank"
                                    className="text-tertiary"
                                    to={`https://ascvn.com.vn/huong-dan-thao-tac-sinh-vien-thanh-toan-hoc-phi-online.html`}
                                >
                                    tại đây
                                </Link>
                            </p>
                            <p>
                                4. Để hủy giao dịch chờ gạch nợ, vui lòng bấm{" "}
                                <Link
                                    target="_blank"
                                    className="text-tertiary"
                                    to={`/phieu-thu-tong-hop`}
                                >
                                    vào đây
                                </Link>
                                .
                            </p>
                            <p>
                                5. Khuyến cáo thanh toán qua các loại thẻ ATM
                                nội địa, QR-Code
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button
                onClick={handlePayment}
                className="flex items-center justify-center px-5 py-3 mt-3 ml-auto rounded shadow-md bg-primary hover:bg-tertiary text-lite"
            >
                {loading ? <Loading /> : <span>Xác nhận</span>}
            </button>
        </div>
    );
};

export default Body;

import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setPaymentTime } from "../../store/actions/paymentSlice";

const Header = () => {
    const dispatch = useDispatch();
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPaymentTime(e.target.value));
    };
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">Thanh toán trực tuyến</h1>
            <div className="flex items-center justify-center gap-x-2">
                <span className="text-[12px] font-medium text-text3 flex-shrink-0">
                    Đợt
                </span>
                <select
                    name="sltSemester"
                    id="sltSemester"
                    onChange={(e) => handleSelectChange(e)}
                    className="px-3 py-[6px] border border-text3 rounded-md w-full max-w-[180px]"
                >
                    <option value="0">Tất cả</option>
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
        </div>
    );
};

export default Header;

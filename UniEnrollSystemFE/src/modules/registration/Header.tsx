import { useDispatch } from "react-redux";
import { setRegistrationPeriod } from "../../store/actions/registrationSlice";

const Header = () => {
    const dispatch = useDispatch();
    const handleChangePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const [semester, year] = value.split("-");
        dispatch(setRegistrationPeriod({ semester: +semester, year: +year }));
    };
    return (
        <>
            <div className="py-2 mb-10 border-b border-b-text3">
                <h1 className="text-lg font-semibold">Đăng ký học phần</h1>
            </div>
            <div className="flex items-center justify-center mb-10 gap-x-2">
                <select
                    name="sltSemester"
                    id="sltSemester"
                    className="py-[6px] px-3 border border-text2 w-[360px]"
                    onChange={(e) => handleChangePeriod(e)}
                >
                    <option value="0">Chọn đợt đăng ký</option>
                    <option value="3-2024">Học kỳ 3 (2024-2025)</option>
                    <option value="2-2024">Học kỳ 2 (2024-2025)</option>
                    <option value="1-2024">Học kỳ 1 (2024-2025)</option>
                    <option value="3-2023">Học kỳ 3 (2023-2024)</option>
                    <option value="2-2023">Học kỳ 2 (2023-2024)</option>
                    <option value="1-2023">Học kỳ 1 (2023-2024)</option>
                    <option value="3-2022">Học kỳ 3 (2022-2023)</option>
                    <option value="2-2022">Học kỳ 2 (2022-2023)</option>
                    <option value="1-2022">Học kỳ 1 (2022-2023)</option>
                    <option value="3-2021">Học kỳ 3 (2021-2022)</option>
                    <option value="2-2021">Học kỳ 2 (2021-2022)</option>
                    <option value="1-2021">Học kỳ 1 (2021-2022)</option>
                </select>
                <div className="flex items-center justify-center gap-x-3">
                    <div className="flex items-center justify-center gap-x-2">
                        <input type="radio" name="radOption" id="radNewLearn" />
                        <label
                            htmlFor="radNewLearn"
                            className="text-sm font-medium cursor-pointer"
                        >
                            Học mới
                        </label>
                    </div>
                    <div className="flex items-center justify-center gap-x-2">
                        <input
                            type="radio"
                            name="radOption"
                            id="radImproveLearn"
                        />
                        <label
                            htmlFor="radImproveLearn"
                            className="text-sm font-medium cursor-pointer"
                        >
                            Học cải thiện
                        </label>
                    </div>
                    <div className="flex items-center justify-center gap-x-2">
                        <input type="radio" name="radOption" id="radRelearn" />
                        <label
                            htmlFor="radRelearn"
                            className="text-sm font-medium cursor-pointer"
                        >
                            Học lại
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;

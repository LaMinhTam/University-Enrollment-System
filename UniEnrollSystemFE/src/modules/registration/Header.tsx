const Header = () => {
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
                >
                    <option value="1">Học kỳ 1 (2021-2022)</option>
                    <option value="2">Học kỳ 2 (2021-2022)</option>
                    <option value="3">Học kỳ 3 (2021-2022)</option>
                    <option value="4">Học kỳ 1 (2022-2023)</option>
                    <option value="5">Học kỳ 2 (2022-2023)</option>
                    <option value="6">Học kỳ 3 (2022-2023)</option>
                    <option value="7">Học kỳ 1 (2023-2024)</option>
                    <option value="8">Học kỳ 2 (2023-2024)</option>
                    <option value="9">Học kỳ 3 (2023-2024)</option>
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

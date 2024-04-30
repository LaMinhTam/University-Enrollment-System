import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { v4 as uuidv4 } from "uuid";
const TableClasses = () => {
    const courseSelectedClasses = useSelector(
        (state: RootState) => state.registration.courseSelectedClasses
    );
    return (
        <div className="flex items-start justify-center mb-10 gap-x-3">
            <div className="w-full max-h-[600px] overflow-y-auto overflow-x-hidden">
                <div className="w-full px-2 font-bold border-l-4 border-l-error text-text7">
                    Lớp học phần chờ đăng ký
                </div>
                <div className="flex items-center justify-end my-5">
                    <input
                        type="checkbox"
                        name="chkFilterCalendar"
                        id="chkFilterCalendar"
                    />
                    <strong className="text-sm font-bold text-error">
                        HIỂN THỊ LỚP HỌC PHẦN KHÔNG TRÙNG LỊCH
                    </strong>
                </div>
                <table className="w-full mt-5 border border-collapse border-text2">
                    <thead>
                        <tr className="bg-text7 bg-opacity-10">
                            <th>STT</th>
                            <th>Thông tin lớp học phần</th>
                            <th>Đã đăng ký</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseSelectedClasses.map((item, index) => (
                            <tr key={uuidv4()} className="w-full bg-senary">
                                <td>{index + 1}</td>
                                <td>
                                    <strong>{item.courseName}</strong>
                                    <br />
                                    Học kỳ: {item.semester} - Năm học:{" "}
                                    {item.year}
                                    <br />
                                    Sĩ số tối đa: {item.maxCapacity}
                                </td>
                                <td className="text-sm font-bold text-center text-error">
                                    67/{item.maxCapacity}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full">
                <div className="w-full px-2 font-bold border-l-4 border-l-error text-text7">
                    Chi tiết lớp học phần
                </div>
                <div className="flex items-center justify-end mt-5">
                    <button className="px-3 py-[6px] text-lite text-center bg-quinary">
                        Xem lịch trùng
                    </button>
                </div>
                <table className="w-full mt-5 border border-collapse border-text2">
                    <thead>
                        <tr className="bg-text7 bg-opacity-10">
                            <th>
                                Trạng thái:{" "}
                                <strong className="text-sm font-bold text-error">
                                    Đã khóa
                                </strong>
                            </th>
                            <th>Sĩ số tối đa: 70</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map(() => (
                            <tr className="bg-senary">
                                <td>
                                    Lịch học: LT - Thứ 2 (Tiết 1 - 3 )
                                    <br />
                                    Cơ sở: Cơ sở 1 (Thành phố Hồ Chí Minh)
                                    <br />
                                    Dãy nhà: A (CS1)
                                    <br />
                                    Phòng: A1.02
                                </td>
                                <td>
                                    GV: NCS Huỳnh Văn Hiếu
                                    <br />
                                    13/05/2024 - 13/05/2024
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex items-center justify-center">
                    <button className="px-5 h-[44px] text-lite text-center bg-tertiary w-[210px] mt-5">
                        Đăng ký
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableClasses;

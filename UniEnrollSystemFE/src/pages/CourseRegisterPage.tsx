import { useEffect } from "react";
import RequiredAuthPage from "./RequiredAuthPage";
import CheckIcon from "@mui/icons-material/Check";
import PrintIcon from "@mui/icons-material/Print";

const CourseRegisterPage = () => {
    useEffect(() => {
        document.title = "Đăng ký học phần";
    }, []);

    return (
        <RequiredAuthPage>
            <div className="w-full h-full mt-5 bg-lite p-[10px]">
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
                            <input
                                type="radio"
                                name="radOption"
                                id="radNewLearn"
                            />
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
                            <input
                                type="radio"
                                name="radOption"
                                id="radRelearn"
                            />
                            <label
                                htmlFor="radRelearn"
                                className="text-sm font-medium cursor-pointer"
                            >
                                Học lại
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mb-10">
                    <div className="w-full px-2 font-bold border-l-4 border-l-error text-text7">
                        Môn học/học phần đang chờ đăng ký
                    </div>
                    <table className="w-full mt-5 border border-collapse border-text2">
                        <thead>
                            <tr className="bg-text7 bg-opacity-10">
                                <th className="p-3"></th>
                                <th>STT</th>
                                <th>Mã học phần</th>
                                <th>Tên môn học / Học phần</th>
                                <th>Số tín chỉ</th>
                                <th>Bắt buộc</th>
                                <th>
                                    học phần: học trước (a), tiên quyết (b),
                                    song hành (c)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="radio"
                                        name="chkCourse"
                                        id="chkCourse"
                                    />
                                </td>
                                <td>1</td>
                                <td>INT1001</td>
                                <td>Lập trình căn bản</td>
                                <td>3</td>
                                <td>
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                        <CheckIcon />
                                    </span>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="radio"
                                        name="chkCourse"
                                        id="chkCourse"
                                    />
                                </td>
                                <td>2</td>
                                <td>INT1002</td>
                                <td>Lập trình nâng cao</td>
                                <td>3</td>
                                <td>
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                        <CheckIcon />
                                    </span>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="radio"
                                        name="chkCourse"
                                        id="chkCourse"
                                    />
                                </td>
                                <td>3</td>
                                <td>INT1003</td>
                                <td>Thiết kế web</td>
                                <td>3</td>
                                <td>
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                        <CheckIcon />
                                    </span>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
                        <table className="mt-5 border border-collapse border-text2">
                            <thead>
                                <tr className="bg-text7 bg-opacity-10">
                                    <th>STT</th>
                                    <th>Thông tin lớp học phần</th>
                                    <th>Đã đăng ký</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td className="flex flex-col items-start justify-center border-b border-b-text2">
                                            <span>Toán ứng dụng</span>
                                            <span>
                                                Trạng thái:{" "}
                                                <strong className="text-sm font-bold text-error">
                                                    Chờ sinh viên đăng ký
                                                </strong>
                                            </span>
                                            <span>
                                                Mã lớp học phần: 420300319301 -
                                                DHMT19A
                                            </span>
                                        </td>
                                        <td>63 / 70</td>
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
                                            Cơ sở: Cơ sở 1 (Thành phố Hồ Chí
                                            Minh)
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
                <div>
                    <div className="flex items-center justify-between">
                        <div className="w-full px-2 font-bold border-l-4 border-l-error text-text7">
                            Lớp HP đã đăng ký trong học kỳ này
                        </div>
                        <button className="flex items-center justify-center px-4 py-2 rounded hover:text-tertiary hover:bg-strock gap-x-2 bg-tertiary text-lite">
                            <PrintIcon />
                            <span className="font-normal">In</span>
                        </button>
                    </div>
                    <table className="w-full mt-5 border border-collapse border-text2">
                        <thead>
                            <tr>
                                <th>Thao tác</th>
                                <th>STT</th>
                                <th>Mã lớp HP</th>
                                <th>Tên môn học/HP</th>
                                <th>Lớp học dự kiến</th>
                                <th>TC</th>
                                <th>Nhóm TH</th>
                                <th>Học phí</th>
                                <th>Hạn nộp</th>
                                <th>Thu</th>
                                <th>Trạng thái ĐK</th>
                                <th>Ngày ĐK</th>
                                <th>TT lớp HP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={5} className="text-center">
                                    Tổng
                                </td>
                                <td>19</td>
                            </tr>
                            {Array.from({ length: 5 }).map(() => (
                                <tr>
                                    <td>
                                        <button className="px-3 py-[6px] text-lite text-center bg-quinary">
                                            Hủy
                                        </button>
                                    </td>
                                    <td>1</td>
                                    <td>420300319301</td>
                                    <td>Toán ứng dụng</td>
                                    <td>420300319301 - DHMT19A</td>
                                    <td>3</td>
                                    <td>1</td>
                                    <td>2.450.000</td>
                                    <td>13/05/2024</td>
                                    <td>
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                            <CheckIcon />
                                        </span>
                                    </td>
                                    <td>Đã đăng ký</td>
                                    <td>13/05/2024</td>
                                    <td>Đã khóa</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </RequiredAuthPage>
    );
};

export default CourseRegisterPage;

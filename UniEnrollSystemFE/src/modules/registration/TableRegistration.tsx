import PrintIcon from "@mui/icons-material/Print";
import CheckIcon from "@mui/icons-material/Check";

const TableRegistration = () => {
    return (
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
    );
};

export default TableRegistration;

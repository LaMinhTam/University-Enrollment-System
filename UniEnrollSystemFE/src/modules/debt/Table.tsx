import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ReactElement, useState } from "react";
const Table = () => {
    const [expandedSections, setExpandedSections] = useState<
        Record<string, boolean>
    >({});

    const toggleSection = (section: string): void => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section],
        });
    };

    const renderRows = (
        section: string,
        count: number
    ): ReactElement | null => {
        if (!expandedSections[section]) return null;

        return (
            <>
                {Array.from({ length: count }).map((_, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{section}</td>
                        <td>IT1630</td>
                        <td>IT1630_01</td>
                        <td>IT1630_01</td>
                        <td>Phân tích thiết kế hệ thống thông tin</td>
                        <td>3</td>
                        <td>2023-10-10</td>
                        <td>Đã mở</td>
                        <td>Đã đăng ký</td>
                        <td>1,000,000</td>
                        <td>1,000,000</td>
                        <td>0</td>
                        <td>1,000,000</td>
                        <td>0</td>
                        <td>1,000,000</td>
                    </tr>
                ))}
            </>
        );
    };
    return (
        <table className="mt-5 border border-collapse border-text2 table-debt">
            <thead>
                <tr>
                    <th>STT</th>
                    <th
                        style={{
                            width: "200px",
                            minWidth: "200px",
                        }}
                    >
                        Đợt
                    </th>
                    <th>Mã môn học</th>
                    <th
                        style={{
                            width: "120px",
                            minWidth: "120px",
                        }}
                    >
                        Mã LHP
                    </th>
                    <th>Học phần</th>
                    <th
                        style={{
                            width: "300px",
                            minWidth: "300px",
                        }}
                    >
                        Tên môn
                    </th>
                    <th>Số tín chỉ</th>
                    <th
                        style={{
                            width: "150px",
                            minWidth: "150px",
                        }}
                    >
                        Ngày đăng ký
                    </th>
                    <th>Trạng thái LHP</th>
                    <th>Trạng thái đăng ký</th>
                    <th>Đơn giá</th>
                    <th>Học phí ban đầu</th>
                    <th>Miễn giảm</th>
                    <th>Mức nộp</th>
                    <th>Đã nộp</th>
                    <th>Công nợ</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    className="trSemesterInfo"
                    onClick={() => toggleSection("3-2023")}
                >
                    <td colSpan={16} className="cursor-pointer">
                        {expandedSections["3-2023"] ? (
                            <ExpandLessIcon />
                        ) : (
                            <ExpandMoreIcon />
                        )}
                        <span>Đợt: 2023_HK3 (2023-2024)</span>
                    </td>
                </tr>
                {renderRows("3-2023", 2)}
                <tr
                    className="trSemesterInfo"
                    onClick={() => toggleSection("2-2023")}
                >
                    <td colSpan={16} className="cursor-pointer">
                        {expandedSections["2-2023"] ? (
                            <ExpandLessIcon />
                        ) : (
                            <ExpandMoreIcon />
                        )}
                        <span>Đợt: 2023_HK2 (2023-2024)</span>
                    </td>
                </tr>
                {renderRows("2-2023", 6)}
                <tr
                    className="trSemesterInfo"
                    onClick={() => toggleSection("1-2023")}
                >
                    <td colSpan={16} className="cursor-pointer">
                        {expandedSections["1-2023"] ? (
                            <ExpandLessIcon />
                        ) : (
                            <ExpandMoreIcon />
                        )}
                        <span>Đợt: 2023_HK1 (2023-2024)</span>
                    </td>
                </tr>
                {renderRows("1-2023", 8)}
            </tbody>
        </table>
    );
};

export default Table;

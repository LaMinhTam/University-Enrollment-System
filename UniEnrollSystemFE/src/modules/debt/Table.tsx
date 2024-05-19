import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import React, { ReactElement, useState } from "react";
import { IDept } from "../../types/debtTypes";
import { formatDate } from "../../utils/formatTime";
import StatusComponent from "../../components/common/StatusComponent";
const Table = ({ data }: { data: { [key: string]: IDept[] } }) => {
    const [expandedSections, setExpandedSections] = useState<
        Record<string, boolean>
    >({});

    const toggleSection = (section: string): void => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section],
        });
    };

    const renderRows = (section: string): ReactElement | null => {
        if (!expandedSections[section]) return null;

        return (
            <>
                {data[section].map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{`HK${item.semester}-${item.year}`}</td>
                        <td>{item.courseId}</td>
                        <td>{item.classId}</td>
                        <td>{item.courseName}</td>
                        <td>{item.credit}</td>
                        <td>{formatDate(new Date(item.create_at))}</td>
                        <td>Đăng ký mới</td>
                        <td>{item.amount}</td>
                        <td>{item.amount}</td>
                        <td>{item.deduct}</td>
                        <td>{item.total}</td>
                        <td>
                            <StatusComponent paymentStatus={item.status} />
                        </td>
                        <td>{item.total}</td>
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
                {Object.keys(data).map((section, index) => (
                    <React.Fragment key={index}>
                        <tr
                            className="cursor-pointer trSemesterInfo"
                            onClick={() => toggleSection(section)}
                        >
                            <td colSpan={16}>
                                <div className="flex items-center justify-start">
                                    {expandedSections[section] ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                    <span>{`Đợt: ${section.split("-")[1]}_HK${
                                        section.split("-")[0]
                                    }`}</span>
                                </div>
                            </td>
                        </tr>
                        {renderRows(section)}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default Table;

const TableInfo = ({
    handleCalculateTotalCredit,
}: {
    handleCalculateTotalCredit: () => number;
}) => {
    return (
        <>
            <tr className="trSemester">
                <td colSpan={4}>Tổng tín chỉ yêu cầu</td>
                <td
                    style={{
                        color: "red",
                    }}
                >
                    {handleCalculateTotalCredit()}
                </td>
                <td colSpan={5}></td>
            </tr>
            <tr className="trSemester">
                <td colSpan={4}>Tổng tín chỉ bắt buộc</td>
                <td
                    style={{
                        color: "red",
                    }}
                >
                    106
                </td>
                <td colSpan={5}></td>
            </tr>
            <tr className="trSemester">
                <td colSpan={4}>Tổng tín chỉ tự chọn</td>
                <td
                    style={{
                        color: "red",
                    }}
                >
                    32
                </td>
                <td colSpan={5}></td>
            </tr>
        </>
    );
};

export default TableInfo;

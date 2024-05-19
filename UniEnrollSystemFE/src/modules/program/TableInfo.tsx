const TableInfo = ({
    handleCalculateTotalCredit,
    handleCalculateTotalCreditOfMandatory,
    handleCalculateTotalCreditOfElective,
}: {
    handleCalculateTotalCredit: () => number;
    handleCalculateTotalCreditOfMandatory: () => number;
    handleCalculateTotalCreditOfElective: () => number;
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
                    {handleCalculateTotalCreditOfMandatory()}
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
                    {handleCalculateTotalCreditOfElective()}
                </td>
                <td colSpan={5}></td>
            </tr>
        </>
    );
};

export default TableInfo;

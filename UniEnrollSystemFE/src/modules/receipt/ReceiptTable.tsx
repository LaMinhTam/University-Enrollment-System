import EditNoteIcon from "@mui/icons-material/EditNote";
import { IReceipt } from "../../types/receiptType";
import { formatDate } from "../../utils/formatTime";
import handleFormatMoney from "../../utils/handleFormatMoney";
import { useState } from "react";
const ReceiptTable = ({ data }: { data: IReceipt[] }) => {
    console.log("ReceiptTable ~ data:", data);
    const [receptSelectedId, setReceptSelectedId] = useState<string>("");
    // const handleSelectedReceipt = () => {

    // }
    return (
        <table className="w-full mt-5 border border-collapse border-text2 table-receipt">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Số phiếu</th>
                    <th>Mã hóa đơn</th>
                    <th>Ngày thu</th>
                    <th>Số tiền</th>
                    <th>Đơn vị thu</th>
                    <th>Chi tiết</th>
                </tr>
            </thead>
            <tbody>
                {data.map((receipt, index) => (
                    <tr
                        key={receipt.id}
                        className={`cursor-pointer ${
                            receptSelectedId === receipt.id ? "chk-course" : ""
                        }`}
                        onClick={() => setReceptSelectedId(receipt.id)}
                    >
                        <td>{index + 1}</td>
                        <td>{Math.floor(100000 + Math.random() * 900000)}</td>
                        <td>HD{Math.floor(100000 + Math.random() * 900000)}</td>
                        <td>{formatDate(new Date(receipt.createAt))}</td>
                        <td>{handleFormatMoney(receipt.amount)}</td>
                        <td>{receipt.collectingUnit}</td>
                        <td>
                            <EditNoteIcon className="cursor-pointer text-primary" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReceiptTable;

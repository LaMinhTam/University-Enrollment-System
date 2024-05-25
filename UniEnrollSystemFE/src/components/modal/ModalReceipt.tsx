import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenReceiptModal } from "../../store/actions/modalSlice";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";
import { RootState } from "../../store/configureStore";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import { useAuth } from "../../contexts/auth-context";
// import ReceiptPDF from "../../modules/receipt/ReceiptPDF";

const ModalReceipt = () => {
    const dispatch = useDispatch();
    const receiptData = useSelector(
        (state: RootState) => state.modal.receiptData
    );
    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // const { userInfo } = useAuth();

    return (
        <div className="w-[1000px] h-full flex flex-col rounded-lg">
            <div className="flex items-center w-full h-[48px] p-2 bg-strock">
                <div className="flex items-center justify-start mr-auto gap-x-5">
                    <h1 className="px-2 font-bold border-l-4 border-l-error text-text7">
                        Số phiếu: {receiptData.orderId}
                    </h1>
                    <h1 className="px-2 font-bold border-l-4 border-l-error text-text7">
                        Mã hóa đơn: {receiptData.orderCode}
                    </h1>
                    <h1 className="px-2 font-bold border-l-4 border-l-error text-text7">
                        Ngày thu:{" "}
                        {new Date(
                            receiptData.receipt.createAt
                        ).toLocaleDateString()}
                    </h1>
                </div>
                <button
                    onClick={() => dispatch(setIsOpenReceiptModal(false))}
                    className="flex items-center justify-center w-8 h-8 mb-1 rounded-full hover:bg-text3 hover:bg-opacity-10"
                >
                    <CloseRoundedIcon />
                </button>
            </div>
            <div className="flex items-center justify-end mt-5 mr-5">
                <button
                    className="flex items-center justify-center w-[150px] h-[28px] px-2
                            rounded hover:text-tertiary hover:bg-strock gap-x-2 bg-tertiary 
                            text-lite text-[12px] font-normal shadow-md"
                    onClick={handlePrint}
                >
                    <PrintIcon />
                    <span>In phiếu thu</span>
                </button>
                {/* <div className="flex items-center justify-end mt-5 mr-5">
                    <PDFDownloadLink
                        document={
                            <ReceiptPDF
                                receiptData={receiptData}
                                userInfo={userInfo}
                            />
                        }
                        fileName="receipt.pdf"
                    >
                        {({ loading }) => (
                            <button
                                className="flex items-center justify-center w-[150px] h-[28px] px-2
                            rounded hover:text-tertiary hover:bg-strock gap-x-2 bg-tertiary 
                            text-lite text-[12px] font-normal shadow-md"
                            >
                                <PrintIcon />
                                <span>
                                    {loading ? "Loading..." : "In phiếu thu"}
                                </span>
                            </button>
                        )}
                    </PDFDownloadLink>
                </div> */}
            </div>
            <div className="p-2">
                <table
                    className="w-full mt-5 border border-collapse border-text2 table-receipt"
                    ref={componentRef}
                >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã</th>
                            <th>Nội dung thu</th>
                            <th>Học kỳ</th>
                            <th>Số tiền (VNĐ)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receiptData.receipt.coursePayments.map(
                            (coursePayment, index) => (
                                <tr key={coursePayment.classId}>
                                    <td>{index + 1}</td>
                                    <td>{coursePayment.courseId}</td>
                                    <td>{coursePayment.courseName}</td>
                                    <td>
                                        HK{coursePayment.semester}-
                                        {coursePayment.year}
                                    </td>
                                    <td>{coursePayment.amount}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ModalReceipt;

import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import { IReceiptData } from "../../types/commonType";
import { IStudent } from "../../types/studentType";
import { formatDate } from "../../utils/formatTime";

// Register a font
Font.register({
    family: "Noto Sans",
    fonts: [
        {
            src: "../../assets/font/notosans/NotoSans-VariableFont_wdth,wght.ttf",
        },
    ],
});

const styles = StyleSheet.create({
    page: { padding: 30, fontFamily: "Noto Sans" },
    section: { margin: 10, padding: 10 },
    header: { fontSize: 12, marginBottom: 10 },
    table: { width: "auto", marginTop: 20 },
    tableRow: { flexDirection: "row" },
    tableCol: { width: "25%", borderStyle: "solid", borderWidth: 1 },
    tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
});

const ReceiptPDF = ({
    receiptData,
    userInfo,
}: {
    receiptData: IReceiptData;
    userInfo: IStudent;
}) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.header}>
                <Text>BỘ CÔNG THƯƠNG</Text>
                <Text>TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP</Text>
                <Text>TP.HCM</Text>
                <Text>--------------------------</Text>
                <Text>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
                <Text>Độc Lập - Tự Do - Hạnh Phúc</Text>
                <Text>---------------------------------</Text>
                <Text>PHIẾU XÁC NHẬN ĐÃ ĐÓNG HỌC PHÍ</Text>
            </View>
            <View style={styles.section}>
                <Text>Mã sinh viên: {receiptData.receipt.studentId}</Text>
                <Text>Họ tên: {userInfo.name}</Text>
                <Text>Lớp học: DHKTPM17C</Text>
                <Text>Hệ đào tạo: đại học</Text>
                <Text>Khoa: {userInfo.facultyName}</Text>
                <Text>Mã hóa đơn: {receiptData.orderCode}</Text>
                <Text>Số phiếu: {receiptData.orderId}</Text>
                <Text>
                    Ngày in phiếu:{" "}
                    {formatDate(new Date(receiptData.receipt.createAt))}
                </Text>
            </View>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>STT</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Mã</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Nội dung thu</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Học kỳ</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Số tiền (VNĐ)</Text>
                    </View>
                </View>
                {receiptData.receipt.coursePayments.map(
                    (coursePayment, index) => (
                        <View
                            style={styles.tableRow}
                            key={coursePayment.classId}
                        >
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {index + 1}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {coursePayment.courseId}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {coursePayment.courseName}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text
                                    style={styles.tableCell}
                                >{`HK${coursePayment.semester}-${coursePayment.year}`}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {coursePayment.amount}
                                </Text>
                            </View>
                        </View>
                    )
                )}
            </View>
            <View style={styles.section}>
                <Text>
                    Tổng cộng:{" "}
                    {receiptData.receipt.coursePayments.reduce(
                        (total, coursePayment) => total + coursePayment.amount,
                        0
                    )}
                </Text>
                <Text>Số tiền bằng chữ: {""}</Text>
            </View>
        </Page>
    </Document>
);

export default ReceiptPDF;

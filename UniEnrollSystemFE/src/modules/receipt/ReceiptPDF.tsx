import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { IReceiptData } from "../../types/commonType";
import { formatDate } from "../../utils/formatTime";
import { IStudent } from "../../types/studentType";
import { Font } from "@react-pdf/renderer";

Font.register({
    family: "Poppins", // replace 'YourFont' with the name of your font
    src: require("../../assets/font/Poppins/Poppins-Medium.ttf"),
});

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#E4E4E4",
        fontFamily: "Poppins",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});

const ReceiptPDF = ({
    receiptData,
    userInfo,
}: {
    receiptData: IReceiptData;
    userInfo: IStudent;
}) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Số phiếu: {receiptData.orderId}</Text>
                    <Text>Mã hóa đơn: {receiptData.orderCode}</Text>
                    <Text>
                        Ngày thu:{" "}
                        {formatDate(new Date(receiptData.receipt.createAt))}
                    </Text>
                </View>
                <View style={styles.section}>
                    {receiptData.receipt.coursePayments.map(
                        (coursePayment, index) => (
                            <View key={coursePayment.classId}>
                                <Text>{index + 1}</Text>
                                <Text>{coursePayment.courseId}</Text>
                                <Text>{coursePayment.courseName}</Text>
                                <Text>
                                    HK{coursePayment.semester}-
                                    {coursePayment.year}
                                </Text>
                                <Text>{coursePayment.amount}</Text>
                            </View>
                        )
                    )}
                </View>
            </Page>
        </Document>
    );
};

export default ReceiptPDF;

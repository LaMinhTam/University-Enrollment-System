interface IReceipt {
    id: string;
    studentId: string;
    amount: number;
    createAt: Date;
    collectingUnit: string;
    coursePayments: CoursePayment[];
    status: string;
}

interface CoursePayment {
    classId: string;
    courseId: string;
    courseName: string;
    credit: number;
    studentId: string;
    create_at: Date;
    update_at: Date;
    semester: number;
    year: number;
    amount: number;
    deduct: number;
    total: number;
    status: string;
}

type ReceiptResponse = {
    message: string;
    data: IReceipt[];
    status: number;
};

export default ReceiptResponse;

export type { IReceipt, CoursePayment };

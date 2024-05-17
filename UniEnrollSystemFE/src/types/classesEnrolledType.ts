interface IClassesEnrolled {
    id: string;
    courseId: string;
    courseName: string;
    semester: number;
    year: number;
    maxCapacity: number;
    status: string;
    group: number;
    credit: number;
    updateAt: Date;
    paymentStatus: PAYMENT_STATUS;
    fee: number;
}

enum PAYMENT_STATUS {
    "PAID",
    "UNPAID",
    "PENDING",
    "ERROR",
    "REFUND",
}

type ClassesEnrolledResponse = {
    message: string;
    data: IClassesEnrolled[];
    status: number;
};

type RemoveClassesEnrolled = {
    message: string;
    data: null;
    status: number;
};

export default ClassesEnrolledResponse;

export type { IClassesEnrolled, RemoveClassesEnrolled };
export { PAYMENT_STATUS };

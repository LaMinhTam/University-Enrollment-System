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
    paymentStatus: string;
    fee: number;
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

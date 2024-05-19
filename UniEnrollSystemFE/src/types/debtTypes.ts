interface IDept {
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

type DebtResponse = {
    message: string;
    data: { [key: string]: IDept[] };
    status: number;
};

type DebtBySemesterResponse = {
    message: string;
    data: IDept[];
    status: number;
};

export default DebtResponse;

export type { IDept, DebtBySemesterResponse };

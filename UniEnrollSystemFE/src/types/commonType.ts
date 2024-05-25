import { IPrerequisite } from "./courseType";
import { IReceipt } from "./receiptType";

export interface IClassesEnrolledSchedule {
    id: string;
    dayOfWeek: number;
    timeSlot: string;
    startDate: Date;
    endDate: Date;
    room: string;
    location: string;
    lecturer: string;
    group?: number;
    classType: string;
    dayOff: Date[] | null;
}

export interface IReceiptData {
    orderId: number;
    orderCode: string;
    receipt: IReceipt;
}

export interface IWaitingCourse {
    id: string;
    name: string;
    credit: number;
    theoryCredit: number;
    practicalCredit: number;
    type: number;
    prerequisites: IPrerequisite[];
    fee: number | null;
}

export interface IScholarShipResponse {
    message: string;
    data: number;
    status: number;
}

export interface IStatisticsReport {
    message: string;
    data: IMetric;
    status: number;
}

export interface IPaymentResponse {
    message: string;
    data: string;
    status: number;
}
export interface IWaitListResponse {
    message: string;
    data: string;
    status: number;
}

export interface IWaitingCourseResponse {
    message: string;
    data: IWaitingCourse[];
    status: number;
}

export interface ILearnedCreditResponse {
    message: string;
    data: {
        totalEarnedCredits: number;
        totalRequiredCredits: number;
    };
    status: number;
}

export interface IMetric {
    subjects: string[];
    averages: number[];
    grades: number[];
}

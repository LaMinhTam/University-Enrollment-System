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

export interface IMetric {
    subjects: string[];
    averages: number[];
    grades: number[];
}

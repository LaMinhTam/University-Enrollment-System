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

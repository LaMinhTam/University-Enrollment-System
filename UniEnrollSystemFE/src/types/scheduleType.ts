interface ISchedule {
    dayOfWeek: number;
    timeSlot: string;
    startDate: Date;
    endDate: Date;
    room: string;
    location: string;
    lecturer: string;
    classType: string;
    dayOff: Date[] | null;
}

interface IClassSchedule {
    classId: string;
    courseId: string;
    courseName: string;
    schedules: ISchedule[];
}

type ClassScheduleResponse = {
    message: string;
    data: IClassSchedule[];
    status: number;
};

export default ClassScheduleResponse;

export type { ISchedule, IClassSchedule };

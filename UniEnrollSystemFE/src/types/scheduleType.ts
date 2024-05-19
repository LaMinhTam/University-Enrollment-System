interface ISchedule {
    dayOfWeek: number;
    timeSlot: string;
    startDate: Date;
    endDate: Date;
    room: string;
    location: string;
    lecturer: string;
    group: number;
    classType: string;
    dayOff: Date[] | null;
}

interface IExistedSchedule {
    existingClassId: string;
    existingCourseId: string;
    existingCourseName: string;
    existingSchedule: ISchedule;
    newClassId: string;
    newCourseId: string;
    newCourseName: string;
    newSchedule: ISchedule;
}

interface IClassSchedule {
    classId: string;
    courseId: string;
    courseName: string;
    schedules: ISchedule[];
}

type ClassScheduleResponse = {
    message: string;
    data: IClassSchedule[] | IExistedSchedule[];
    status: number;
};

export default ClassScheduleResponse;

export type { ISchedule, IClassSchedule, IExistedSchedule };

interface ScheduleData {
    date: Date;
    schedule: Schedule[];
}

interface Schedule {
    classId: string;
    courseId: string;
    courseName: string;
    schedules: Schedules;
}

interface Schedules {
    dayOfWeek: number;
    timeSlot: string;
    startDate: Date;
    endDate: Date;
    room: string;
    location: string;
    lecturer: string;
    group: number;
    classType: string;
    dayOff: Date[];
}

type StudyScheduleResponse = {
    message: string;
    data: ScheduleData[];
    status: number;
};

export default StudyScheduleResponse;
export type { ScheduleData, Schedule, Schedules };

import { ScheduleData } from "../types/studyScheduleType";

export default function handleFilterExamSchedule(schedules: ScheduleData[]) {
    return schedules.map((schedule) => {
        const newSchedule = { ...schedule };
        newSchedule.schedule = schedule.schedule.filter(
            (item) =>
                item.schedules.classType === "FINAL_EXAM" ||
                item.schedules.classType === "MIDTERM_EXAM"
        );
        return newSchedule;
    });
}

import { ScheduleData } from "../types/studyScheduleType";

export default function handleFilterStudySchedule(schedules: ScheduleData[]) {
    return schedules.map((schedule) => {
        const newSchedule = { ...schedule };
        newSchedule.schedule = schedule.schedule.filter(
            (item) => item.schedules.classType === "THEORY"
        );
        return newSchedule;
    });
}

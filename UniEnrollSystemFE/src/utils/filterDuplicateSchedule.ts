import { IClassesEnrolledSchedule } from "../types/commonType";
import { IClass } from "../types/courseType";

export default function filterDuplicateSchedule(
    listClasses: IClass[],
    classesEnrolledSchedule: IClassesEnrolledSchedule[]
) {
    return listClasses.filter((item) => {
        const filteredSchedules = item.schedules.filter(
            (schedule) =>
                schedule.classType === "THEORY" ||
                schedule.classType === "PRACTICE"
        );
        return !filteredSchedules.some((schedule) =>
            classesEnrolledSchedule.some(
                (enrolled) =>
                    enrolled.timeSlot === schedule.timeSlot &&
                    enrolled.dayOfWeek === schedule.dayOfWeek
            )
        );
    });
}

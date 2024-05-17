import { IClassesEnrolled } from "../types/classesEnrolledType";
import { ICourseRegistration } from "../types/courseType";

export default function handleGetClassesEnrolledSchedule(
    classes: IClassesEnrolled[],
    courses: {
        [key: string]: ICourseRegistration;
    }
) {
    const result = classes.flatMap((item) => {
        const schedules = Object.values(courses).flatMap((v) => {
            return Object.values(v.classes).filter((c) => {
                if (c.id === item.id) {
                    return true;
                }
                return false;
            });
        });

        return schedules.map((i) => {
            return {
                ...item,
                schedules: i.schedules,
            };
        });
    });

    const classesEnrolledSchedule = result
        .map((item) => {
            const filteredSchedules = item.schedules.filter(
                (schedule) =>
                    schedule.classType === "THEORY" ||
                    schedule.classType === "PRACTICE"
            );
            return filteredSchedules.map((i) => {
                if (i.classType === "PRACTICE") {
                    if (i.group === item.group) {
                        return {
                            id: item.id,
                            ...i,
                        };
                    } else {
                        return null;
                    }
                } else {
                    return {
                        id: item.id,
                        ...i,
                    };
                }
            });
        })
        .flat();
    const finalClassesEnrolledSchedule = classesEnrolledSchedule.filter(
        (item) => item !== null
    );
    return finalClassesEnrolledSchedule;
}

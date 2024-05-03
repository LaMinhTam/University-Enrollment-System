import { IClass } from "../types/courseType";

const handleIncrementQuantityOfClass = (
    courseSelectedClasses: IClass[],
    classSchedule: IClass
) => {
    const newCourseSelectedClasses = courseSelectedClasses.map((course) => {
        if (course.id === classSchedule.id) {
            return {
                ...course,
                quantity: course.quantity + 1,
            };
        }
        return course;
    });
    return newCourseSelectedClasses;
};

const handleDecrementQuantityOfClass = (
    courseSelectedClasses: IClass[],
    id: string
) => {
    const newCourseSelectedClasses = courseSelectedClasses.map((course) => {
        if (course.id === id) {
            return {
                ...course,
                quantity: course.quantity - 1,
            };
        }
        return course;
    });
    return newCourseSelectedClasses;
};

const handleChangeQuantityOfClass = (
    courseSelectedClasses: IClass[],
    classSchedule: IClass,
    oldClassId: string
) => {
    const newCourseSelectedClasses = courseSelectedClasses.map((course) => {
        if (course.id === classSchedule.id) {
            return {
                ...course,
                quantity: course.quantity + 1,
            };
        }
        if (course.id === oldClassId) {
            return {
                ...course,
                quantity: course.quantity - 1,
            };
        }
        return course;
    });
    return newCourseSelectedClasses;
};

export default handleChangeQuantityOfClass;

export { handleIncrementQuantityOfClass, handleDecrementQuantityOfClass };

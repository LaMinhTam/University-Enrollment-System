import { ISchedule } from "./scheduleType";

interface ICourseRegistration {
    course: ICourse;
    classes: { [key: string]: IClass };
}

interface IClass {
    id: string;
    courseId: string;
    courseName: string;
    semester: number;
    year: number;
    maxCapacity: number;
    status: string;
    quantity: number;
    schedules: ISchedule[];
}

interface ICourse {
    id: string;
    name: string;
    credit: number;
    theoryCredit: number;
    practicalCredit: number;
    type: number;
    prerequisites: IPrerequisite[];
    fee: number;
}

interface IPrerequisite {
    id: string;
    name: string;
    credit: number;
    theoryCredit: number;
    practicalCredit: number;
}

type CourseRegistrationResponse = {
    message: string;
    data: { [key: string]: ICourseRegistration };
    status: number;
};

export default CourseRegistrationResponse;

export type { ICourseRegistration, IClass, ICourse, IPrerequisite };

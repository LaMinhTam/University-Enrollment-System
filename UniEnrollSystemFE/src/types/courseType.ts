interface ICourseRegistration {
    course: ICourse;
    classes: IClass[];
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
}

interface ICourse {
    id: string;
    name: string;
    credit: number;
    theoryCredit: number;
    practicalCredit: number;
    type: number;
    prerequisites: IPrerequisite[];
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

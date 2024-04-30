interface ICourse {
    id: string;
    name: string;
    credit: number;
    theoryCredit: number;
    practicalCredit: number;
    prerequisites?: ICourse[];
}

interface IClass {
    id: string;
    courseId: string;
    courseName: string;
    semester: number;
    year: number;
    maxCapacity: number;
    status: string;
}

interface ICourseRegistration {
    course: ICourse;
    classes: IClass[];
}

type CourseRegistrationResponse = {
    message: string;
    data: ICourseRegistration[];
    status: number;
};

export default CourseRegistrationResponse;

export type { ICourse, IClass, ICourseRegistration };

interface IEducationPrograms {
    mandatoryCredits: number;
    electiveCredits: number;
    coursesMandatory: ICourses[];
    coursesElective: ICourses[];
}

interface ICourses {
    id: string;
    name: string;
    credit: number;
    theoryCredit: number;
    practicalCredit: number;
    type: number;
    semester: number;
    electiveGroup: number;
    prerequisites: IPrerequisite[];
    isPass: boolean;
}

interface IPrerequisite {
    id: string;
    name: string;
    credit: number;
    theoryCredit: number;
    practicalCredit: number;
}

type EducationProgramsResponse = {
    message: string;
    data: { [key: string]: IEducationPrograms };
    status: number;
};

export default EducationProgramsResponse;

export type { IEducationPrograms, IPrerequisite, ICourses };

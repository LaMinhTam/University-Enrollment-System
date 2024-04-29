interface IEducationPrograms {
    id: string;
    name: string;
    credit: number;
    theoryCredit: number;
    practicalCredit: number;
    courseOnMajorList: ICourseOnMajorList[];
}

interface ICourseOnMajorList {
    majorId: number;
    semester: number;
    type: number;
    academicYear: number;
}

type EducationProgramsResponse = {
    message: string;
    data: { [key: string]: IEducationPrograms[] };
    status: number;
};

export default EducationProgramsResponse;

export type { IEducationPrograms, ICourseOnMajorList };

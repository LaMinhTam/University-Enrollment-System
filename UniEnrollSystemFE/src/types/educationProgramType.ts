interface IEducationPrograms {
    id: string;
    name: string;
    credit: number;
    theoryCredit: number;
    practicalCredit: number;
    type: number;
    semester: number;
    prerequisites: IPrerequisite[];
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
    data: { [key: string]: IEducationPrograms[] };
    status: number;
};

export default EducationProgramsResponse;

export type { IEducationPrograms, IPrerequisite };

interface IStudyResult {
    studentId: string;
    semester: number;
    year: number;
    majorId: string;
    gradeReports: GradeReport[];
    GPA: number;
    GPA4: number;
    totalCredits: number;
    totalPassedCredits: number;
    accumulatedGPA: number;
    accumulatedGPA4: number;
    accumulatedCredits: number;
    accumulatedPassedCredits: number;
}

interface GradeReport {
    classId: string;
    studentId: string;
    courseId: string;
    courseName: string;
    credit: number;
    practicalCredit: number;
    theoryCredit: number;
    midtermScore: number;
    finalScore: number;
    practicalScores: number[];
    theoryScores: number[];
    overallScore: number;
    status: Status;
}

enum Status {
    Passed = "PASSED",
    Failed = "FAILED",
}

type StudyResultsResponse = {
    message: string;
    data: IStudyResult[];
    status: number;
};

type StudyResultResponse = {
    message: string;
    data: IStudyResult;
    status: number;
};

export default StudyResultsResponse;

export type { IStudyResult, GradeReport, StudyResultResponse };

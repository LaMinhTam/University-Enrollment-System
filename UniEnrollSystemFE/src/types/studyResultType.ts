interface IStudyResult {
    studentId: string;
    semester: number;
    year: number;
    majorId: string;
    gradeReports: GradeReport[];
    gpa: number;
    totalCredits: number;
    totalPassedCredits: number;
    accumulatedTotalCredits: number;
    accumulatedGPA: number;
    accumulatedTotalPassedCredits: number;
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

type StudyResultResponse = {
    message: string;
    data: IStudyResult[];
    status: number;
};

export default StudyResultResponse;

export type { IStudyResult, GradeReport };

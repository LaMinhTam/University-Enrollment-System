package vn.edu.iuh.fit.grademanagementservice.dtos;

import vn.edu.iuh.fit.grademanagementservice.models.GradeReport;

import java.util.List;

public record SemesterSummaryDTO(
        int semester,
        int year,
        List<GradeReport> gradeReports,
        double GPA,
        double GPA4,
        int totalCredits,
        int totalPassedCredits,
        double accumulatedGPA,
        double accumulatedGPA4,
        int accumulatedCredits,
        int accumulatedPassedCredits
) {
}

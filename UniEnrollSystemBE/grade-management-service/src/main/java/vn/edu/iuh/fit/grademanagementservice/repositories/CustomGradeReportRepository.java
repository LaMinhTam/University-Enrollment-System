package vn.edu.iuh.fit.grademanagementservice.repositories;

import vn.edu.iuh.fit.grademanagementservice.models.GradeReport;

public interface CustomGradeReportRepository {
    GradeReport findByStudentIdAndClassId(String studentId, String classId);
}

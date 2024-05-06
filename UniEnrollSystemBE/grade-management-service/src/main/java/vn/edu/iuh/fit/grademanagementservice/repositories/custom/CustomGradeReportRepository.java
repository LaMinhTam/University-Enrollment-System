package vn.edu.iuh.fit.grademanagementservice.repositories.custom;

import vn.edu.iuh.fit.grademanagementservice.models.GradeReport;

public interface CustomGradeReportRepository {
    GradeReport findByStudentIdAndClassId(String studentId, String classId);

}

package vn.edu.iuh.fit.grademanagementservice.services;

import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.grademanagementservice.models.GradeReport;

public interface GradeReportService {
    GradeReport getGradeReport(String studentId, String courseId);
}

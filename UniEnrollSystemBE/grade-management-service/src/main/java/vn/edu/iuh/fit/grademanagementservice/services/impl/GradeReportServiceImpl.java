package vn.edu.iuh.fit.grademanagementservice.services.impl;

import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.grademanagementservice.models.GradeReport;
import vn.edu.iuh.fit.grademanagementservice.repositories.GradeReportRepository;
import vn.edu.iuh.fit.grademanagementservice.services.GradeReportService;

@Service
public class GradeReportServiceImpl implements GradeReportService{
    private final GradeReportRepository gradeReportRepository;

    public GradeReportServiceImpl(GradeReportRepository gradeReportRepository) {
        this.gradeReportRepository = gradeReportRepository;
    }

    @Override
    public GradeReport getGradeReport(String studentId, String courseId) {
        return gradeReportRepository.findByStudentIdAndClassId(studentId, courseId);
    }
}

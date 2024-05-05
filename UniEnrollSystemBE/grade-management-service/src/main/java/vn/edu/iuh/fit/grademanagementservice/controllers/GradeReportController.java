package vn.edu.iuh.fit.grademanagementservice.controllers;

import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.grademanagementservice.models.GradeReport;
import vn.edu.iuh.fit.grademanagementservice.services.GradeReportService;

@RestController
@RequestMapping("/grade-report")
public class GradeReportController {
    private final GradeReportService gradeReportService;

    public GradeReportController(GradeReportService gradeReportService) {
        this.gradeReportService = gradeReportService;
    }

    @GetMapping("/get")
    public GradeReport getGradeReport(@RequestHeader("id") String studentId, @RequestParam("course_id") String courseId) {
        return gradeReportService.getGradeReport(studentId, courseId);
    }
}

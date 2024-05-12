package vn.edu.iuh.fit.grademanagementservice.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.grademanagementservice.dtos.ResponseWrapper;
import vn.edu.iuh.fit.grademanagementservice.dtos.SemesterSummaryDTO;
import vn.edu.iuh.fit.grademanagementservice.dtos.StatisticResponse;
import vn.edu.iuh.fit.grademanagementservice.models.SemesterSummary;
import vn.edu.iuh.fit.grademanagementservice.services.SemesterSummaryService;

import java.util.List;

@RestController
@RequestMapping("/semester-report")
public class SemesterSummaryController {
    private final SemesterSummaryService semesterSummaryService;

    public SemesterSummaryController(SemesterSummaryService semesterSummaryService) {
        this.semesterSummaryService = semesterSummaryService;
    }

    @GetMapping("/summary")
    public ResponseEntity<?> getSemesterSummaryService(@RequestHeader("id") String studentId, @RequestParam("semester") int semester, @RequestParam("year") int year) {
        return ResponseEntity.ok(new ResponseWrapper("Kết quả học tập theo học kỳ", semesterSummaryService.getSemesterSummary(studentId, semester, year), 200));
    }

    @GetMapping("/summaries")
    public ResponseEntity<?> getSemesterSummaries(@RequestHeader("id") String studentId) {
        List<SemesterSummary> semesterSummaries = semesterSummaryService.getSemesterSummaries(studentId);
        List<SemesterSummaryDTO> semesterSummaryDTOS = semesterSummaries.stream().map(semesterSummary -> {
            int currentIndex = semesterSummaries.indexOf(semesterSummary);

            List<SemesterSummary> summariesUpToCurrent = semesterSummaries.subList(0, currentIndex + 1);

            float accumulatedGPA = summariesUpToCurrent.stream().map(SemesterSummary::getGpa).reduce(0.0f, Float::sum) / summariesUpToCurrent.size();
            int accumulatedCredits = summariesUpToCurrent.stream().map(SemesterSummary::getTotalCredits).reduce(0, Integer::sum);
            int accumulatedPassedCredits = summariesUpToCurrent.stream().map(SemesterSummary::getTotalPassedCredits).reduce(0, Integer::sum);

            return new SemesterSummaryDTO(
                    semesterSummary.getSemester(),
                    semesterSummary.getYear(),
                    semesterSummary.getGradeReports(),
                    semesterSummary.getGpa(),
                    semesterSummary.getGpa()/2.5,
                    semesterSummary.getTotalCredits(),
                    semesterSummary.getTotalPassedCredits(),
                    accumulatedGPA,
                    accumulatedGPA/2.5,
                    accumulatedCredits,
                    accumulatedPassedCredits
            );
        }).toList();

        return ResponseEntity.ok(new ResponseWrapper("Kết quả học tập", semesterSummaryDTOS, 200));
    }

    @GetMapping("/statistics")
    public ResponseEntity<?> getStatistics(@RequestHeader("id") String studentId, @RequestParam("semester") int semester, @RequestParam("year") int year) {
        return ResponseEntity.ok(new ResponseWrapper("Thống kê điểm", semesterSummaryService.getStatistics(studentId, semester, year), 200));
    }

    @GetMapping("/estimate/scholarship")
    public ResponseEntity estimateScholarship(@RequestHeader("major_id") int majorId, @RequestParam("semester") int semester, @RequestParam("year") int year, @RequestParam("gpa") float gpa) {
        return ResponseEntity.ok(new ResponseWrapper("Ước lượng học bổng", semesterSummaryService.estimateScholarship(majorId, semester, year, gpa), 200));
    }
}

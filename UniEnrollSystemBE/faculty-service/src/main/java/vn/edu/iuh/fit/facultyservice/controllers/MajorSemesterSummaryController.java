package vn.edu.iuh.fit.facultyservice.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.facultyservice.models.MajorSemesterSummary;
import vn.edu.iuh.fit.facultyservice.services.MajorSemesterSummaryService;

import java.util.List;

@RestController
@RequestMapping("/faculties")
public class MajorSemesterSummaryController {
    private final MajorSemesterSummaryService majorSemesterSummaryService;

    public MajorSemesterSummaryController(MajorSemesterSummaryService majorSemesterSummaryService) {
        this.majorSemesterSummaryService = majorSemesterSummaryService;
    }

    @GetMapping("/major-semester-summary")
    public List<MajorSemesterSummary> getMajorSemesterSummary(@RequestParam("majorId") int majorId, @RequestParam("year") int year) {
        return majorSemesterSummaryService.findAllByMajorIdAndYear(majorId, year);
    }
}

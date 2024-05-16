package vn.edu.iuh.fit.courseservice.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.courseservice.client.FacultyClient;
import vn.edu.iuh.fit.courseservice.dtos.*;
import vn.edu.iuh.fit.courseservice.services.CourseService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/courses")
public class CourseController {
    private final CourseService courseService;
    private final FacultyClient facultyClient;

    public CourseController(CourseService courseService, FacultyClient facultyClient) {
        this.courseService = courseService;
        this.facultyClient = facultyClient;
    }

    @GetMapping
    public ResponseEntity<?> listAllCourses(@RequestHeader("major_id") int majorId, @RequestHeader("academic_year") int year) {
        Map<Integer, List<CourseDTO>> courses = courseService.listAllCourseByMajorAndYear(majorId, year);
        List<MajorSemesterSummary> majorSemesterSummaries = facultyClient.getMajorSemesterSummary(majorId, year);
        //i want to map majorSemesterSummaries to courses by semester of majorSemesterSummaries equals key of courses
        Map<Integer, SemesterSummary> semesterSummaryMap = new HashMap<>();
        for (MajorSemesterSummary majorSemesterSummary : majorSemesterSummaries) {
            semesterSummaryMap.put(majorSemesterSummary.semester(),
                    new SemesterSummary(
                            majorSemesterSummary.totalMandatoryCredits(),
                            majorSemesterSummary.totalElectiveCredits(),
                            filterCourseByType(courses.get(majorSemesterSummary.semester()), true),
                            filterCourseByType(courses.get(majorSemesterSummary.semester()), false)
                    )
            );
        }
        return ResponseEntity.ok(new ResponseWrapper("Chương trình khung", semesterSummaryMap, HttpStatus.OK.value()));
    }

    @GetMapping("/by-ids")
    public List<ListCourseResponse> getCoursesByIds(@RequestHeader("major_id") int majorId, @RequestParam List<String> courseIds) {
        return courseService.getCoursesByIds(majorId, courseIds);
    }

    public List<CourseDTO> filterCourseByType(List<CourseDTO> courses, boolean isMandatory) {
        if (isMandatory) {
            return courses.stream().filter(course -> course.getType() == 1).collect(Collectors.toList());
        } else {
            return courses.stream().filter(course -> course.getType() == 0).collect(Collectors.toList());
        }
    }
}

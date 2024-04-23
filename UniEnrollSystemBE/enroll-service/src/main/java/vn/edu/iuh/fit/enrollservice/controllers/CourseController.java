package vn.edu.iuh.fit.enrollservice.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.enrollservice.dtos.ResponseWrapper;
import vn.edu.iuh.fit.enrollservice.models.Course;
import vn.edu.iuh.fit.enrollservice.services.CourseService;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public ResponseEntity<?> listAllCourses(@RequestHeader("major_id") int majorId, @RequestHeader("academic_year") int year) {
        List<Course> courses = courseService.listAllCourseByMajorAndYear(majorId, year);
        return ResponseEntity.ok(new ResponseWrapper("Chương trình khung", courses, HttpStatus.OK.value()));
    }
}

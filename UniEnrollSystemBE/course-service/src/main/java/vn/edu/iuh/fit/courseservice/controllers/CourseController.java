package vn.edu.iuh.fit.courseservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.courseservice.dtos.ResponseWrapper;
import vn.edu.iuh.fit.courseservice.models.Course;
import vn.edu.iuh.fit.courseservice.services.CourseService;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<?> listAllCourses(@RequestHeader("major_id") int majorId, @RequestHeader("academic_year") int year) {
        List<Course> courses = courseService.listAllCourseByMajorAndYear(majorId, year);
        return ResponseEntity.ok(new ResponseWrapper("Chương trình khung", courses, HttpStatus.OK.value()));
    }

    @GetMapping("/by-ids")
    public List<Course> getCoursesByIds(@RequestBody List<String> courseIds) {
        return courseService.getCoursesByIds(courseIds);
    }
}

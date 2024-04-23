package vn.edu.iuh.fit.facultyservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.facultyservice.dtos.CourseDTO;
import vn.edu.iuh.fit.facultyservice.dtos.ResponseWrapper;
import vn.edu.iuh.fit.facultyservice.models.Course;
import vn.edu.iuh.fit.facultyservice.models.Faculty;
import vn.edu.iuh.fit.facultyservice.models.MajorCourseYear;
import vn.edu.iuh.fit.facultyservice.models.Student;
import vn.edu.iuh.fit.facultyservice.services.CourseService;
import vn.edu.iuh.fit.facultyservice.services.StudentService;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {
    private final CourseService courseService;
    private final StudentService studentService;

    public CourseController(CourseService courseService, StudentService studentService) {
        this.courseService = courseService;
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<?> listAllCourses(@RequestHeader("id") String id) {
        Student student = studentService.get(id);
        List<CourseDTO> courses = courseService.listAllCourseByMajorAndYear(student.getMajor().getId(), student.getYear());
        return ResponseEntity.ok(new ResponseWrapper("Chương trình khung", courses, HttpStatus.OK.value()));
    }
}

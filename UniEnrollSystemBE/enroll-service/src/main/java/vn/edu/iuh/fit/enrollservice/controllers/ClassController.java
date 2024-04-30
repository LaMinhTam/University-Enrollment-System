package vn.edu.iuh.fit.enrollservice.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.enrollservice.client.CourseClient;
import vn.edu.iuh.fit.enrollservice.dtos.Course;
import vn.edu.iuh.fit.enrollservice.dtos.MapCourseClass;
import vn.edu.iuh.fit.enrollservice.dtos.ResponseWrapper;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.services.ClassService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/classes")
public class ClassController {
    private final ClassService classService;
    private final CourseClient courseClient;

    public ClassController(ClassService classService, CourseClient courseClient) {
        this.classService = classService;
        this.courseClient = courseClient;
    }

    @GetMapping
    public ResponseEntity<?> listAllClasses(@RequestHeader("major_id") int majorId, @RequestParam("semester") int semester, @RequestParam("year") int year) {
        List<Class> classes = classService.listAllClasses(semester, year);

        List<String> courseIds = classes.stream().map(Class::getCourseId).collect(Collectors.toList());

        List<Course> courses = courseClient.getCoursesByIds(majorId, courseIds);

        Map<String, List<Class>> classesGroupedByCourseId = classes.stream()
                .collect(Collectors.groupingBy(Class::getCourseId));

        List<MapCourseClass> coursesWithClasses = new ArrayList<>();
        courses.forEach(course -> {
            coursesWithClasses.add(new MapCourseClass(course, classesGroupedByCourseId.get(course.id())));
        });

        return ResponseEntity.ok(new ResponseWrapper("Danh sách lớp học", coursesWithClasses, 200));
    }

}

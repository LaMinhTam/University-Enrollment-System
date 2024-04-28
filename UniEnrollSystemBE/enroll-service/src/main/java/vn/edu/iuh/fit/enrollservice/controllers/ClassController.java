package vn.edu.iuh.fit.enrollservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.enrollservice.client.CourseClient;
import vn.edu.iuh.fit.enrollservice.dtos.ClassWithCourse;
import vn.edu.iuh.fit.enrollservice.dtos.Course;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.services.ClassService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
    public ResponseEntity<?> listAllClasses(@RequestParam("semester") int semester, @RequestParam("year") int year) {
        // Retrieve classes for the specified semester and year
        List<Class> classes = classService.listAllClasses(semester, year);

        // Extract course IDs from the retrieved classes
        List<String> courseIds = classes.stream().map(Class::getCourseId).collect(Collectors.toList());

        // Retrieve courses based on the extracted course IDs
        List<Course> courses = courseClient.getCoursesByIds(courseIds);

        // Map courses to classes and create ClassWithCourse objects
        List<ClassWithCourse> classesWithCourses = new ArrayList<>();
        for (Class clazz : classes) {
            Optional<Course> optionalCourse = courses.stream().filter(course -> course.id().equals(clazz.getCourseId())).findFirst();
            optionalCourse.ifPresent(course -> {
                ClassWithCourse classWithCourse = new ClassWithCourse(
                        clazz.getId(),
                        course,
                        clazz.getSemester(),
                        clazz.getYear(),
                        clazz.getMaxCapacity(),
                        clazz.getStatus()
                );
                classesWithCourses.add(classWithCourse);
            });
        }

        return ResponseEntity.ok(classesWithCourses);
    }

}

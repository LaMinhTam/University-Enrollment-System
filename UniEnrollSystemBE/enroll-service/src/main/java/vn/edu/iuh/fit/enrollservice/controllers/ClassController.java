package vn.edu.iuh.fit.enrollservice.controllers;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.enrollservice.client.CourseClient;
import vn.edu.iuh.fit.enrollservice.dtos.Course;
import vn.edu.iuh.fit.enrollservice.dtos.MapCourseClass;
import vn.edu.iuh.fit.enrollservice.dtos.ResponseWrapper;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.services.ClassRedisService;
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
    private final ClassRedisService classRedisService;

    public ClassController(ClassService classService, CourseClient courseClient, RedisTemplate<String, Object> redisTemplate, ClassRedisService classRedisService) {
        this.classService = classService;
        this.courseClient = courseClient;
        this.classRedisService = classRedisService;
    }

    @GetMapping
    public ResponseEntity<?> listAllClasses(@RequestHeader("major_id") int majorId, @RequestParam("semester") int semester, @RequestParam("year") int year) {
        List<MapCourseClass> coursesWithClasses = classRedisService.getAllCourses(majorId, semester, year);

        if (coursesWithClasses == null) {
            List<Class> classes = classService.listAllClasses(semester, year);

            List<String> courseIds = classes.stream().map(Class::getCourseId).collect(Collectors.toList());

            List<Course> courses = courseClient.getCoursesByIds(majorId, courseIds);

            Map<String, List<Class>> classesGroupedByCourseId = classes.stream()
                    .collect(Collectors.groupingBy(Class::getCourseId));

            coursesWithClasses = new ArrayList<>();
            for (Course course : courses) {
                coursesWithClasses.add(new MapCourseClass(course, classesGroupedByCourseId.get(course.getId())));
            }

            classRedisService.setAllCourses(majorId, semester, year, coursesWithClasses);
        }


        return ResponseEntity.ok(new ResponseWrapper("Danh sách lớp học", coursesWithClasses, 200));
    }
}

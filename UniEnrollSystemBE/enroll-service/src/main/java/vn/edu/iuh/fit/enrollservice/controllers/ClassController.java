package vn.edu.iuh.fit.enrollservice.controllers;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.enrollservice.client.CourseClient;
import vn.edu.iuh.fit.enrollservice.client.ScheduleClient;
import vn.edu.iuh.fit.enrollservice.dtos.*;
import vn.edu.iuh.fit.enrollservice.services.ClassRedisService;
import vn.edu.iuh.fit.enrollservice.services.ClassService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/classes")
public class ClassController {
    private final ClassService classService;
    private final CourseClient courseClient;
    private final ClassRedisService classRedisService;
    private final ScheduleClient scheduleClient;

    public ClassController(ClassService classService, CourseClient courseClient, RedisTemplate<String, Object> redisTemplate, ClassRedisService classRedisService, ScheduleClient scheduleClient) {
        this.classService = classService;
        this.courseClient = courseClient;
        this.classRedisService = classRedisService;
        this.scheduleClient = scheduleClient;
    }

    @GetMapping("/registrable")
    public ResponseEntity<?> listAllClasses(@RequestHeader("major_id") int majorId, @RequestParam("semester") int semester, @RequestParam("year") int year) {
        Map<String, MapCourseClass> coursesWithClasses = classRedisService.getAllCourses(majorId, semester, year);

        if (coursesWithClasses == null) {
            List<ClassDTO> classes = classService.listAllClasses(semester, year);

            List<String> courseIds = classes.stream().map(ClassDTO::getCourseId).collect(Collectors.toList());
            List<String> classIds = classes.stream().map(ClassDTO::getId).toList();
            Map<String, ClassSchedule> classScheduleMap = scheduleClient.getSchedules(new ClassIdsRequest(classIds));
            classes.forEach(classDTO -> {
                List<Schedule> schedules = classScheduleMap.get(classDTO.getId()).schedules();
                classDTO.setSchedules(schedules);
            });
            List<Course> courses = courseClient.getCoursesByIds(majorId, courseIds);

            Map<String, List<ClassDTO>> classesGroupedByCourseId = classes.stream()
                    .collect(Collectors.groupingBy(ClassDTO::getCourseId));
            coursesWithClasses = new HashMap<>();
            for (Course course : courses) {
                coursesWithClasses.put(course.id(), new MapCourseClass(course, classesGroupedByCourseId.get(course.id())));
            }

            classRedisService.setAllCourses(majorId, semester, year, coursesWithClasses);
        }


        return ResponseEntity.ok(new ResponseWrapper("Danh sách lớp học", coursesWithClasses, 200));
    }
}

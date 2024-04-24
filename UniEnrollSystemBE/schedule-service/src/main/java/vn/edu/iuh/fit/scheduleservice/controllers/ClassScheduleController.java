package vn.edu.iuh.fit.scheduleservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.scheduleservice.models.ClassSchedule;
import vn.edu.iuh.fit.scheduleservice.services.ClassScheduleService;

import java.util.List;

@RestController
@RequestMapping("/schedules")
public class ClassScheduleController {
    private final ClassScheduleService classScheduleService;

    public ClassScheduleController(ClassScheduleService classScheduleService) {
        this.classScheduleService = classScheduleService;
    }

    @PostMapping("/registry")
    public List<ClassSchedule> registrySchedule(@RequestHeader("id") String studentId, @RequestParam("course_id") String courseId) {
        return classScheduleService.registrySchedule(studentId, courseId);
    }

    @DeleteMapping("/cancel")
    public void cancelSchedule(@RequestHeader("id") String studentId, @RequestParam("class_id") String classId) {
        classScheduleService.cancelSchedule(studentId, classId);
    }
}

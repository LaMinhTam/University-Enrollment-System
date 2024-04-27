package vn.edu.iuh.fit.scheduleservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.scheduleservice.dtos.ClassIdsRequest;
import vn.edu.iuh.fit.scheduleservice.dtos.DateRequest;
import vn.edu.iuh.fit.scheduleservice.dtos.ResponseWrapper;
import vn.edu.iuh.fit.scheduleservice.models.ClassSchedule;
import vn.edu.iuh.fit.scheduleservice.models.Schedule;
import vn.edu.iuh.fit.scheduleservice.services.ClassScheduleService;

import java.text.ParseException;
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

    @GetMapping("/classes/{id}")
    public ResponseEntity<?> getScheduleByClassId(@PathVariable String id) {
        return ResponseEntity.ok(
                new ResponseWrapper(
                        "Lich học",
                        classScheduleService.getScheduleByClassIds(List.of(id)),
                        HttpStatus.OK.value()
                )
        );
    }

    @GetMapping("/classes")
    public ResponseEntity<?> getSchedules(@RequestBody ClassIdsRequest request) {
        return ResponseEntity.ok(
                new ResponseWrapper(
                        "Lich học",
                        classScheduleService.getScheduleByClassIds(request.class_ids()),
                        HttpStatus.OK.value()
                )
        );
    }

    @GetMapping("/classes/by-date")
    public ResponseEntity<?> getSchedulesByDate(@RequestBody DateRequest dateRequest) throws ParseException {
        return ResponseEntity.ok(
                new ResponseWrapper(
                        "Lịch học",
                        classScheduleService.getScheduleByDate(dateRequest),
                        HttpStatus.OK.value()
                )
        );
    }
}

package vn.edu.iuh.fit.scheduleservice.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.scheduleservice.dtos.*;
import vn.edu.iuh.fit.scheduleservice.models.ClassSchedule;
import vn.edu.iuh.fit.scheduleservice.models.StudentSchedule;
import vn.edu.iuh.fit.scheduleservice.services.ClassScheduleService;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/schedules")
public class ClassScheduleController {
    private final ClassScheduleService classScheduleService;

    public ClassScheduleController(ClassScheduleService classScheduleService) {
        this.classScheduleService = classScheduleService;
    }

    @PostMapping("/registry")
    public StudentSchedule registrySchedule(@RequestHeader("id") String studentId, @RequestParam("course_id") String courseId) {
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
    public Map<String, ClassSchedule> getSchedules(@RequestBody ClassIdsRequest request) {
        return classScheduleService.getScheduleByClassIds(request.class_ids());
    }

    @GetMapping("/classes/by-date")
    public ResponseEntity<?> getSchedulesByDate(@RequestHeader("id") String studentId, @RequestBody DateRequest dateRequest) throws ParseException {
        return ResponseEntity.ok(
                new ResponseWrapper(
                        "Lịch học",
                        classScheduleService.getScheduleByDate(studentId, dateRequest),
                        HttpStatus.OK.value()
                )
        );
    }

    @PostMapping("/conflicts")
    public List<ConflictResponse> checkScheduleConflict(@RequestBody ScheduleConflictRequest request) {
        return classScheduleService.getScheduleConflicts(request.enrolledClassIds(), request.newClassId());
    }
}

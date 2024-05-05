package vn.edu.iuh.fit.scheduleservice.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.scheduleservice.dtos.*;
import vn.edu.iuh.fit.scheduleservice.models.ClassSchedule;
import vn.edu.iuh.fit.scheduleservice.models.ClassType;
import vn.edu.iuh.fit.scheduleservice.models.StudentSchedule;
import vn.edu.iuh.fit.scheduleservice.services.ClassScheduleService;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/schedules")
public class ClassScheduleController {
    private final ClassScheduleService classScheduleService;

    public ClassScheduleController(ClassScheduleService classScheduleService) {
        this.classScheduleService = classScheduleService;
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

    @GetMapping("/conflicts")
    public List<ConflictResponse> checkScheduleConflict(@RequestBody ScheduleConflictRequest request) {
        List<QueryClassSchedule> existingSchedules = classScheduleService.getEachScheduleByClassIds(request.enrollGroups());
        List<QueryClassSchedule> newSchedules = getValidSchedules(request.newClassId(), request.groupId());

        return findConflicts(existingSchedules, newSchedules);
    }

    private List<ConflictResponse> findConflicts(List<QueryClassSchedule> existingSchedules, List<QueryClassSchedule> newSchedules) {
        List<ConflictResponse> conflicts = new ArrayList<>();
        for (QueryClassSchedule newSchedule : newSchedules) {
            for (QueryClassSchedule existingSchedule : existingSchedules) {
                if (isConflict(existingSchedule, newSchedule)) {
                    conflicts.add(new ConflictResponse(existingSchedule.classId(), existingSchedule.courseId(), existingSchedule.courseName(), existingSchedule.schedules(), newSchedule.classId(), newSchedule.courseId(), newSchedule.courseName(), newSchedule.schedules()));
                }
            }
        }
        return conflicts;
    }

    private List<QueryClassSchedule> getValidSchedules(String newClassId, int groupId) {
        List<QueryClassSchedule> schedules = classScheduleService.getEachScheduleByClassIds(List.of(new EnrollGroup(newClassId, groupId)));
        return schedules.stream()
                .filter(schedule -> isValidSchedule(schedule, groupId))
                .toList();
    }

    private boolean isValidSchedule(QueryClassSchedule schedule, int groupId) {
        ClassType classType = schedule.schedules().getClassType();
        return ClassType.THEORY == classType || (classType != ClassType.NO_CLASS_DAY &&
                classType != ClassType.MID_TERM_EXAM &&
                classType != ClassType.FINAL_EXAM &&
                schedule.schedules().getGroup() == groupId);
    }

    private boolean isConflict(QueryClassSchedule existingSchedule, QueryClassSchedule newSchedule) {
        // Check if the schedules are on the same day of the week
        if (existingSchedule.schedules().getDayOfWeek() != newSchedule.schedules().getDayOfWeek()) {
            return false;
        }

        // Split the time slots into start and end times
        String[] existingTime = existingSchedule.schedules().getTimeSlot().split("-");
        String[] newTime = newSchedule.schedules().getTimeSlot().split("-");

        // Check if the schedules overlap in time
        if (Integer.parseInt(existingTime[0]) < Integer.parseInt(newTime[1]) &&
                Integer.parseInt(existingTime[1]) > Integer.parseInt(newTime[0])) {
            // If the schedules overlap in time, check if they also overlap in date
            return existingSchedule.schedules().getStartDate().before(newSchedule.schedules().getEndDate()) &&
                    existingSchedule.schedules().getEndDate().after(newSchedule.schedules().getStartDate());
        }

        return false;
    }
}

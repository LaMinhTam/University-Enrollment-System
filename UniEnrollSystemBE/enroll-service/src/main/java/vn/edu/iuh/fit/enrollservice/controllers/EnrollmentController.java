package vn.edu.iuh.fit.enrollservice.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import vn.edu.iuh.fit.enrollservice.client.ScheduleClient;
import vn.edu.iuh.fit.enrollservice.dtos.*;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.models.Enrollment;
import vn.edu.iuh.fit.enrollservice.services.ClassService;
import vn.edu.iuh.fit.enrollservice.services.EnrollmentService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {
    private final EnrollmentService enrollmentService;
    private final ClassService classService;
    private final ScheduleClient scheduleClient;

    public EnrollmentController(EnrollmentService enrollmentService, ClassService classService, ScheduleClient scheduleClient) {
        this.enrollmentService = enrollmentService;
        this.classService = classService;
        this.scheduleClient = scheduleClient;
    }

    @GetMapping("/registry")
    public ResponseEntity<?> getRegistryBySemesterAndYear(@RequestHeader("id") String studentId, @RequestParam int semester, @RequestParam int year) {
        List<Enrollment> registerClasses = enrollmentService.getRegistryClass(studentId, semester, year);
        List<Class> classes = classService.getClassesByEnrollment(registerClasses.stream()
                .map(Enrollment::getRegistryClass)
                .collect(Collectors.toList()));
        return ResponseEntity.ok(new ResponseWrapper("Danh sách học phần đã đăng ký", classes, 400));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerClass(@RequestHeader("id") String studentId, @RequestBody RegistryRequest request) {
        try {
            Class newClass = enrollmentService.getClassById(request.class_id());
            List<Enrollment> registerClasses = enrollmentService.getRegistryClass(studentId, newClass.getSemester(), newClass.getYear());

            // Check if the student is already enrolled in a class with the same courseId
            boolean isAlreadyEnrolledInCourse = registerClasses.stream()
                    .anyMatch(enrollment -> enrollment.getCourseId().equals(newClass.getCourseId()));
            if (isAlreadyEnrolledInCourse) {
                return ResponseEntity.ok(new ResponseWrapper("Bạn đã đăng ký một lớp học cho môn học này", null, 400));
            }

            // Get the class IDs from the registered classes
            List<String> enrolledClassIds = registerClasses.stream()
                    .map(Enrollment::getRegistryClass)
                    .collect(Collectors.toList());

            // Check for schedule conflicts
            List<ConflictResponse> conflictSchedules = scheduleClient.checkScheduleConflict(new ScheduleConflictRequest(enrolledClassIds, request.class_id()));
            if (conflictSchedules.isEmpty()) {
                enrollmentService.registerClass(studentId, request.class_id());
                List<ClassSchedule> schedule = scheduleClient.registrySchedule(studentId, request.class_id());
                return ResponseEntity.ok(new ResponseWrapper("Đăng ký thành công", schedule, 200));
            } else {
                return ResponseEntity.ok(new ResponseWrapper("Lịch học bị trùng", conflictSchedules, 400));
            }
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseWrapper(e.getMessage(), null, 400));
        }
    }

    @PostMapping("/register/change")
    public ResponseEntity<?> changeClass(@RequestHeader("id") String studentId, @RequestBody RequestChangeClass request) {
        try {
            // Get the new class
            Class newClass = enrollmentService.getClassById(request.new_class_id());

            // Get the registered classes for the same semester and year as the new class
            List<Enrollment> registerClasses = enrollmentService.getRegistryClass(studentId, newClass.getSemester(), newClass.getYear());

            // check if the student is already enrolled in old_class_id
            boolean isAlreadyEnrolledInCourse = registerClasses.stream()
                    .anyMatch(enrollment -> enrollment.getRegistryClass().equals(request.old_class_id()));
            if (!isAlreadyEnrolledInCourse) {
                return ResponseEntity.ok(new ResponseWrapper("Bạn chưa đăng ký lớp học này " + request.old_class_id(), null, 400));
            }

            // Get the class IDs from the registered classes, excluding the old class ID
            List<String> enrolledClassIds = registerClasses.stream()
                    .map(Enrollment::getRegistryClass)
                    .filter(classId -> !classId.equals(request.old_class_id()))
                    .collect(Collectors.toList());

            // Check for schedule conflicts with the new class
            List<ConflictResponse> conflictSchedules = scheduleClient.checkScheduleConflict(new ScheduleConflictRequest(enrolledClassIds, request.new_class_id()));
            if (conflictSchedules.isEmpty()) {
                enrollmentService.changeClass(studentId, request.old_class_id(), request.new_class_id());
                scheduleClient.cancelSchedule(studentId, request.old_class_id());
                List<ClassSchedule> schedule = scheduleClient.registrySchedule(studentId, request.new_class_id());

                return ResponseEntity.ok(new ResponseWrapper("Thay đổi lớp học thành công", schedule, 200));
            } else {
                return ResponseEntity.ok(new ResponseWrapper("Lịch học bị trùng", conflictSchedules, 400));
            }
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseWrapper(e.getMessage(), null, 400));
        }
    }

    @DeleteMapping("/cancel")
    public ResponseEntity<?> cancelEnrollment(@RequestHeader("id") String studentId, @RequestParam(name = "class_id") String classId) {
        try {
            enrollmentService.cancelEnrollment(studentId, classId);

            scheduleClient.cancelSchedule(studentId, classId);

            return ResponseEntity.ok(new ResponseWrapper("Hủy đăng ký thành công", null, HttpStatus.OK.value()));
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseWrapper(e.getMessage(), null, HttpStatus.BAD_REQUEST.value()));
        }
    }
}

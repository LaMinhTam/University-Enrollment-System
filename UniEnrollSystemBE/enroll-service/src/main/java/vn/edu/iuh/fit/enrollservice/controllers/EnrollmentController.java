package vn.edu.iuh.fit.enrollservice.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.enrollservice.client.ScheduleClient;
import vn.edu.iuh.fit.enrollservice.dtos.ClassSchedule;
import vn.edu.iuh.fit.enrollservice.dtos.EnrollmentResponse;
import vn.edu.iuh.fit.enrollservice.dtos.ResponseWrapper;
import vn.edu.iuh.fit.enrollservice.models.Enrollment;
import vn.edu.iuh.fit.enrollservice.services.EnrollmentService;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {
    private final EnrollmentService enrollmentService;
    private final ScheduleClient scheduleClient;

    public EnrollmentController(EnrollmentService enrollmentService, ScheduleClient scheduleClient) {
        this.enrollmentService = enrollmentService;
        this.scheduleClient = scheduleClient;
    }

    @PostMapping("/registry")
    public ResponseEntity<?> registryClass(@RequestHeader("id") String studentId, @RequestParam(name = "class_id") String classId) {
        try {
            Enrollment enrollment = enrollmentService.registryClass(studentId, classId);
            List<ClassSchedule> schedule = scheduleClient.registrySchedule(studentId, classId);
            return ResponseEntity.ok(new ResponseWrapper("Đăng ký thành công", new EnrollmentResponse(enrollment, schedule), 200));
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

package vn.edu.iuh.fit.enrollservice.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.enrollservice.client.ScheduleClient;
import vn.edu.iuh.fit.enrollservice.dtos.*;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.models.Enrollment;
import vn.edu.iuh.fit.enrollservice.services.ClassRedisService;
import vn.edu.iuh.fit.enrollservice.services.ClassService;
import vn.edu.iuh.fit.enrollservice.services.EnrollmentService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {
    private final EnrollmentService enrollmentService;
    private final ClassService classService;
    private final ScheduleClient scheduleClient;
    private final ClassRedisService classRedisService;

    public EnrollmentController(EnrollmentService enrollmentService, ClassService classService, ScheduleClient scheduleClient, ClassRedisService classRedisService) {
        this.enrollmentService = enrollmentService;
        this.classService = classService;
        this.scheduleClient = scheduleClient;
        this.classRedisService = classRedisService;
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
            // Get the class IDs from the registered classes
            List<String> enrolledClassIds = enrollmentService.validateAndPrepareRegistration(studentId, request);

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
    public ResponseEntity<?> changeClass(@RequestHeader("id") String studentId, @RequestHeader("major_id") int majorId, @RequestBody RequestChangeClass request) {
        try {
            Class newClass = new Class();
            List<String> enrolledClassIds = enrollmentService.validateAndPrepareRegistration(studentId, request, newClass);

            Map<String, MapCourseClass> coursesWithClasses = classRedisService.getAllCourses(majorId, newClass.getSemester(), newClass.getYear());
            if (coursesWithClasses == null) {
                throw new Exception("Hệ thống hiện đang lỗi, vui lòng thử lại sau");
            }
            MapCourseClass currentCourse = coursesWithClasses.get(newClass.getCourseId());

            //check if request old class id and new class id is the same course and time
            currentCourse.getClasses().stream()
                    .filter(currentClass ->
                            currentClass.getId()
                                    .equals(request.old_class_id()))
                    .findFirst()
                    .orElseThrow(() -> new Exception("Lớp mới và lớp cũ không cùng môn học hoặc không cùng học kỳ"));

            List<ConflictResponse> conflictSchedules = scheduleClient.checkScheduleConflict(new ScheduleConflictRequest(enrolledClassIds, request.new_class_id()));
            if (conflictSchedules.isEmpty()) {
                enrollmentService.changeClass(studentId, request);
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

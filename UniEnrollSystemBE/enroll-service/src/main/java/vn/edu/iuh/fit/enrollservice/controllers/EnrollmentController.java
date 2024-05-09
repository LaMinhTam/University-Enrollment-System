package vn.edu.iuh.fit.enrollservice.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.enrollservice.client.ScheduleClient;
import vn.edu.iuh.fit.enrollservice.dtos.*;
import vn.edu.iuh.fit.enrollservice.messaging.RegisterMessageProducer;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.models.ClassStatus;
import vn.edu.iuh.fit.enrollservice.models.Enrollment;
import vn.edu.iuh.fit.enrollservice.models.PaymentStatus;
import vn.edu.iuh.fit.enrollservice.services.ClassRedisService;
import vn.edu.iuh.fit.enrollservice.services.ClassService;
import vn.edu.iuh.fit.enrollservice.services.EnrollmentService;

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
    private final RegisterMessageProducer registerMessageProducer;

    public EnrollmentController(EnrollmentService enrollmentService, ClassService classService, ScheduleClient scheduleClient, ClassRedisService classRedisService, RegisterMessageProducer registerMessageProducer) {
        this.enrollmentService = enrollmentService;
        this.classService = classService;
        this.scheduleClient = scheduleClient;
        this.classRedisService = classRedisService;
        this.registerMessageProducer = registerMessageProducer;
    }

    @GetMapping("/registry")
    public ResponseEntity<?> getRegistryBySemesterAndYear(@RequestHeader("id") String studentId, @RequestHeader("major_id") int majorId, @RequestParam int semester, @RequestParam int year) {
        Map<String, MapCourseClass> classesBySemesterAndYear = classRedisService.getAllCourses(majorId, semester, year);
        if (classesBySemesterAndYear == null || classesBySemesterAndYear.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResponseWrapper("Hệ thống hiện đang lỗi, vui lòng thử lại sau", null, 400));
        }
        List<Enrollment> registerClasses = enrollmentService.getRegistryClassBySemesterAndYear(studentId, semester, year);
        List<Class> classes = classService.getClassesByEnrollment(registerClasses.stream()
                .map(Enrollment::getRegistryClass)
                .collect(Collectors.toList()));
        //map the classes with registerClasses group to RegistryResponse
        List<RegistryResponse> registryResponse = registerClasses.stream()
                .map(enrollment -> new RegistryResponse(classes.stream()
                        .filter(classObject -> classObject.getId().equals(enrollment.getRegistryClass()))
                        .findFirst()
                        .orElseThrow(),
                        enrollment,
                        classesBySemesterAndYear.get(classes.stream()
                                .filter(classObject -> classObject.getId().equals(enrollment.getRegistryClass()))
                                .findFirst()
                                .orElseThrow()
                                .getCourseId()).course()))
                .toList();
        return ResponseEntity.ok(new ResponseWrapper("Danh sách học phần đã đăng ký", registryResponse, 200));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerClass(@RequestHeader("id") String studentId, @RequestHeader("major_id") int majorId, @RequestBody RegistryRequest request) {
        try {
            Class newClass = enrollmentService.getClassById(request.class_id());
            List<Enrollment> enrollmentsByYearAndSemester = enrollmentService.getRegistryClassBySemesterAndYear(studentId, newClass.getSemester(), newClass.getYear());
            List<Enrollment> enrollmentsNotInYearAndSemester = enrollmentService.getRegistryClassNotInSemesterAndYear(studentId, newClass.getSemester(), newClass.getYear());

            Map<String, MapCourseClass> classesBySemesterAndYear = classRedisService.getAllCourses(majorId, newClass.getSemester(), newClass.getYear());

            validateRegister(enrollmentsByYearAndSemester, enrollmentsNotInYearAndSemester, classesBySemesterAndYear, newClass, request.group());

            List<EnrollGroup> enrollGroups = enrollmentsByYearAndSemester.stream()
                    .map(enrollment -> new EnrollGroup(enrollment.getRegistryClass(), enrollment.getGroup()))
                    .toList();

//             Check for schedule conflicts
            List<ConflictResponse> conflictSchedules = scheduleClient.checkScheduleConflict(new ScheduleConflictRequest(enrollGroups, request.class_id(), request.group()));
            if (conflictSchedules.isEmpty()) {
                enrollmentService.registerClass(studentId, request);
                Course course = classesBySemesterAndYear.get(newClass.getCourseId()).course();
                Double amount = course.practicalCredit() * 800000.0 + course.theoryCredit() * 680000.0;
                registerMessageProducer.sendRegisterSchedule(new RegisterRequest(studentId, request.class_id(), request.group(), newClass.getCourseId(), newClass.getCourseName(), newClass.getYear(), newClass.getSemester(), amount, course.credit()));
                return ResponseEntity.ok(new ResponseWrapper("Đăng ký thành công", null, 200));
            } else {
                return ResponseEntity.ok(new ResponseWrapper("Lịch học bị trùng", conflictSchedules, 400));
            }
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseWrapper(e.getMessage(), null, 400));
        }
    }

    private void validateRegister(List<Enrollment> enrollmentsByYearAndSemester, List<Enrollment> enrollmentsNotInYearAndSemester, Map<String, MapCourseClass> classesBySemesterAndYear, Class targetClass, int group) {
        List<String> unregisteredPrerequisites = classesBySemesterAndYear.get(targetClass.getCourseId()).course().prerequisites().stream()
                .filter(prerequisite -> enrollmentsNotInYearAndSemester.stream()
                        .noneMatch(enrollment -> enrollment.getCourseId().equals(prerequisite.id())))
                .map(prerequisite -> prerequisite.id() + " - " + prerequisite.name())
                .collect(Collectors.toList());

        if (targetClass.getStatus() == ClassStatus.CLOSED) {
            throw new RuntimeException("Lớp học đã đóng, không thể đăng ký");
        } else if (targetClass.getStatus() == ClassStatus.PLANNING) {
            throw new RuntimeException("Lớp học đang trong quá trình lên kế hoạch, không thể đăng ký");
        } else if (enrollmentsByYearAndSemester.stream().anyMatch(enrollment -> enrollment.getRegistryClass().equals(targetClass.getId()))) {
            throw new RuntimeException("Bạn đã đăng ký lớp học này rồi");
        } else if (enrollmentsByYearAndSemester.stream().anyMatch(enrollment -> enrollment.getCourseId().equals(targetClass.getCourseId()))) {
            throw new RuntimeException("Bạn đã đăng ký một lớp học khác cho môn học này");
        } else if (classesBySemesterAndYear == null || classesBySemesterAndYear.isEmpty()) {
            throw new RuntimeException("Hệ thống hiện đang lỗi, vui lòng thử lại sau");
        } else if (!unregisteredPrerequisites.isEmpty()) {
            throw new RuntimeException("Bạn chưa đăng ký môn học tiên quyết " + String.join(", ", unregisteredPrerequisites));
        } else if (group != 0) {
            boolean isMatchFound = classesBySemesterAndYear.get(targetClass.getCourseId()).classes().stream()
                    .filter(classObject -> classObject.getId().equals(targetClass.getId()))
                    .flatMap(classObject -> classObject.getSchedules().stream())
                    .anyMatch(schedule -> schedule.group() == group && schedule.classType() == ClassType.PRACTICE);
            if (!isMatchFound) {
                throw new RuntimeException("Nhóm thực hành không tồn tại");
            }
        } else if (classesBySemesterAndYear.get(targetClass.getCourseId()).course().practicalCredit() != 0) {
            throw new RuntimeException("Hãy đăng ký nhóm thực hành");
        }
    }

    @PostMapping("/register/change")
    public ResponseEntity<?> changeClass(@RequestHeader("id") String studentId, @RequestHeader("major_id") int majorId, @RequestBody RequestChangeClass request) {
        try {
            Class oldClass = enrollmentService.getClassById(request.old_class_id());
            Class newClass = enrollmentService.getClassById(request.new_class_id());
            List<Enrollment> enrollmentsByYearAndSemester = enrollmentService.getRegistryClassBySemesterAndYear(studentId, newClass.getSemester(), newClass.getYear());
            List<Enrollment> enrollmentsNotInYearAndSemester = enrollmentService.getRegistryClassNotInSemesterAndYear(studentId, newClass.getSemester(), newClass.getYear());

            Map<String, MapCourseClass> classesBySemesterAndYear = classRedisService.getAllCourses(majorId, newClass.getSemester(), newClass.getYear());
            validateChange(enrollmentsByYearAndSemester, enrollmentsNotInYearAndSemester, classesBySemesterAndYear, oldClass, newClass, request);

            List<EnrollGroup> enrollGroups = enrollmentsByYearAndSemester.stream()
                    .filter(enrollment -> !enrollment.getCourseId().equals(newClass.getCourseId()))
                    .map(enrollment -> new EnrollGroup(enrollment.getRegistryClass(), enrollment.getGroup()))
                    .toList();

            List<ConflictResponse> conflictSchedules = scheduleClient.checkScheduleConflict(new ScheduleConflictRequest(enrollGroups, request.new_class_id(), request.group()));
            if (conflictSchedules.isEmpty()) {
                enrollmentService.changeClass(studentId, request);
                registerMessageProducer.sendChangeSchedule(new ChangeRegisterRequest(studentId, request.old_class_id(), request.new_class_id()));
                return ResponseEntity.ok(new ResponseWrapper("Thay đổi lớp học thành công", null, 200));
            } else {
                return ResponseEntity.ok(new ResponseWrapper("Lịch học bị trùng", conflictSchedules, 400));
            }
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseWrapper(e.getMessage(), null, 400));
        }
    }

    private void validateChange(List<Enrollment> enrollmentsByYearAndSemester, List<Enrollment> enrollmentsNotInYearAndSemester, Map<String, MapCourseClass> classesBySemesterAndYear, Class oldClass, Class newClass, RequestChangeClass request) {
        if (request.old_class_id().equals(request.new_class_id())) {
            throw new RuntimeException("Không thể đổi cùng một lớp học");
        } else if (enrollmentsByYearAndSemester.stream()
                .anyMatch(enrollment -> enrollment.getRegistryClass().equals(oldClass.getId()) && enrollment.getStatus() == PaymentStatus.PAID)) {
            throw new RuntimeException("Lớp học đã thanh toán không thể đổi");
        } else if (oldClass.getStatus() == ClassStatus.OPENED) {
            throw new RuntimeException("Lớp học đã mở không thể đổi lớp khác");
        } else if (newClass.getStatus() == ClassStatus.CLOSED) {
            throw new RuntimeException("Lớp học đã đóng, không thể đăng ký");
        } else if (newClass.getStatus() == ClassStatus.PLANNING) {
            throw new RuntimeException("Lớp học đang trong quá trình lên kế hoạch, không thể đăng ký");
        } else if (classesBySemesterAndYear == null || classesBySemesterAndYear.isEmpty()) {
            throw new RuntimeException("Hệ thống hiện đang lỗi, vui lòng thử lại sau");
        } else if (enrollmentsByYearAndSemester.stream()
                .noneMatch(enrollment -> enrollment.getRegistryClass().equals(oldClass.getId()))) {
            throw new RuntimeException("Bạn chưa đăng ký lớp học này");
        } else if (classesBySemesterAndYear.get(newClass.getCourseId()).course().prerequisites().stream()
                .anyMatch(prerequisite -> enrollmentsNotInYearAndSemester.stream()
                        .noneMatch(enrollment -> enrollment.getCourseId().equals(prerequisite.id())))) {
            throw new RuntimeException("Bạn chưa đăng ký môn học tiên quyết");
        } else if (request.group() != 0) {
            boolean isMatchFound = classesBySemesterAndYear.get(newClass.getCourseId()).classes().stream()
                    .filter(classObject -> classObject.getId().equals(newClass.getId()))
                    .flatMap(classObject -> classObject.getSchedules().stream())
                    .anyMatch(schedule -> schedule.group() == request.group() && schedule.classType() == ClassType.PRACTICE);
            if (!isMatchFound) {
                throw new RuntimeException("Nhóm thực hành không tồn tại");
            }
        } else if (classesBySemesterAndYear.get(newClass.getCourseId()).course().practicalCredit() != 0) {
            throw new RuntimeException("Hãy đăng ký nhóm thực hành");
        }
    }

    @DeleteMapping("/cancel")
    public ResponseEntity<?> cancelEnrollment(@RequestHeader("id") String studentId, @RequestParam(name = "class_id") String classId) {
        try {
            enrollmentService.cancelEnrollment(studentId, classId);

            registerMessageProducer.sendCancelSchedule(new CancelRequest(studentId, classId, 0));

            return ResponseEntity.ok(new ResponseWrapper("Hủy đăng ký thành công", null, HttpStatus.OK.value()));
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseWrapper(e.getMessage(), null, HttpStatus.BAD_REQUEST.value()));
        }
    }
}

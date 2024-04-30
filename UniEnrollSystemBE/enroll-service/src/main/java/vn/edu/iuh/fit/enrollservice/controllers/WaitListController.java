package vn.edu.iuh.fit.enrollservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.enrollservice.client.CourseClient;
import vn.edu.iuh.fit.enrollservice.dtos.Course;
import vn.edu.iuh.fit.enrollservice.dtos.RegisterWaitListRequest;
import vn.edu.iuh.fit.enrollservice.dtos.ResponseWrapper;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.models.Enrollment;
import vn.edu.iuh.fit.enrollservice.models.WaitList;
import vn.edu.iuh.fit.enrollservice.services.WaitListService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/wait-list")
public class WaitListController {
    private final WaitListService waitListService;
    private final CourseClient courseClient;

    public WaitListController(WaitListService waitListService, CourseClient courseClient) {
        this.waitListService = waitListService;
        this.courseClient = courseClient;
    }

    @GetMapping
    public ResponseEntity<?> getWaitListBySemesterAndYear(@RequestHeader("major_id") int majorId, @RequestHeader("id") String studentId, @RequestParam int semester, @RequestParam int year) {
        List<WaitList> waitListClasses = waitListService.getWaitListClass(studentId, semester, year);
        List<String> courseIds = waitListClasses.stream().map(WaitList::getCourseId).toList();
        List<Course> courses = courseClient.getCoursesByIds(majorId, courseIds);
        return ResponseEntity.ok(new ResponseWrapper("Danh sách học phần đã đăng ký vào danh sách chờ", courses, 200));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerWaitList(@RequestHeader("major_id") int majorId, @RequestHeader("id") String studentId, @RequestBody RegisterWaitListRequest request) {
        List<Course> courses = courseClient.getCoursesByIds(majorId, List.of(request.courseId()));
        if (courses.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResponseWrapper("Không tìm thấy học phần", null, 400));
        }
        waitListService.registerWaitList(studentId, request.courseId(), request.semester(), request.year());
        return ResponseEntity.ok(new ResponseWrapper("Đăng ký vào danh sách chờ thành công", null, 200));
    }
}

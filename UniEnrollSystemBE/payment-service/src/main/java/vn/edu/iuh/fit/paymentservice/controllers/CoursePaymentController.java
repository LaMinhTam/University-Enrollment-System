package vn.edu.iuh.fit.paymentservice.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.paymentservice.dtos.ResponseWrapper;
import vn.edu.iuh.fit.paymentservice.models.CoursePayment;
import vn.edu.iuh.fit.paymentservice.services.CoursePaymentService;

import java.util.Map;

@RestController
@RequestMapping("/course-payments")
public class CoursePaymentController {
    private final CoursePaymentService coursePaymentService;

    public CoursePaymentController(CoursePaymentService coursePaymentService) {
        this.coursePaymentService = coursePaymentService;
    }

    @GetMapping("/page")
    public ResponseEntity<?> getCoursePaymentsPage(@RequestHeader("id") String studentId, @RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(new ResponseWrapper("", coursePaymentService.getAllCoursePaymentsPage(studentId, page, size), HttpStatus.OK.value()));
    }

    @GetMapping("/by-semester")
    public ResponseEntity<?> getCoursePayments(@RequestHeader("id") String studentId, @RequestParam int semester, @RequestParam int year) {
        return ResponseEntity.ok(new ResponseWrapper("", coursePaymentService.getAllCoursePaymentsSemester(studentId, semester, year), HttpStatus.OK.value()));
    }

    @GetMapping("/by-semester-year")
    public Map<String, CoursePayment> getCoursePaymentsByClient(@RequestHeader("id") String studentId, @RequestParam int semester, @RequestParam int year) {
        return coursePaymentService.getCoursePaymentsBySemesterAndYear(studentId, semester, year);
    }
}

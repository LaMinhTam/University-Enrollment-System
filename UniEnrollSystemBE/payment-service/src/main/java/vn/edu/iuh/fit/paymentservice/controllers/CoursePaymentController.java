package vn.edu.iuh.fit.paymentservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.paymentservice.models.CoursePayment;
import vn.edu.iuh.fit.paymentservice.services.CoursePaymentService;

import java.util.List;

@RestController
@RequestMapping("/course-payments")
public class CoursePaymentController {
    private final CoursePaymentService coursePaymentService;

    public CoursePaymentController(CoursePaymentService coursePaymentService) {
        this.coursePaymentService = coursePaymentService;
    }

    @GetMapping
    public ResponseEntity<?> getCoursePayments(@RequestHeader("id") String studentId, @RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(coursePaymentService.getAllCoursePayments(studentId, page, size));
    }
}

package vn.edu.iuh.fit.enrollservice.client;

import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import vn.edu.iuh.fit.enrollservice.dtos.CoursePayment;

import java.util.Map;

@HttpExchange
public interface PaymentClient {
    @GetExchange("/course-payments/by-semester-year")
    public Map<String, CoursePayment> getCoursePaymentsByClient(@RequestHeader("id") String studentId, @RequestParam int semester, @RequestParam int year);
}

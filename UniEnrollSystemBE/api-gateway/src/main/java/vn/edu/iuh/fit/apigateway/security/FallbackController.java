package vn.edu.iuh.fit.apigateway.security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FallbackController {

    @GetMapping("/facultyServiceFallBack")
    public String facultyServiceFallBack() {
        return "Faculty Service is taking too long to respond or is down. Please try again later.";
    }

    @GetMapping("/scheduleServiceFallBack")
    public String scheduleServiceFallBack() {
        return "Schedule Service is taking too long to respond or is down. Please try again later.";
    }

    @GetMapping("/courseServiceFallBack")
    public String courseServiceFallBack() {
        return "Course Service is taking too long to respond or is down. Please try again later.";
    }

    @GetMapping("/paymentServiceFallBack")
    public String paymentServiceFallBack() {
        return "Payment Service is taking too long to respond or is down. Please try again later.";
    }
}
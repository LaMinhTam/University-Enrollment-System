package vn.edu.iuh.fit.enrollservice.client;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import vn.edu.iuh.fit.enrollservice.dtos.CoursePayment;

import java.util.Map;

@Service
public class PaymentClient {
    private final WebClient webClient;

    public PaymentClient(WebClient paymentWebClient) {
        this.webClient = paymentWebClient;
    }

    public Map<String, CoursePayment> getCoursePaymentsByClient(String studentId, int semester, int year) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/course-payments/by-semester-year")
                        .queryParam("semester", semester)
                        .queryParam("year", year)
                        .build())
                .header("id", studentId)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, CoursePayment>>() {})
                .block();
    }
}
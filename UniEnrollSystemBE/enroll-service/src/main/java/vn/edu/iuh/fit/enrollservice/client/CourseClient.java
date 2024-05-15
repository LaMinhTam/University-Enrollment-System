package vn.edu.iuh.fit.enrollservice.client;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import vn.edu.iuh.fit.enrollservice.dtos.Course;

import java.util.List;

@Service
public class CourseClient {
    private final WebClient webClient;

    public CourseClient(WebClient courseWebClient) {
        this.webClient = courseWebClient;
    }

    public List<Course> getCoursesByIds(int majorId, List<String> courseIds) {
        return webClient.post()
                .uri("/courses/by-ids")
                .header("major_id", String.valueOf(majorId))
                .bodyValue(courseIds)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Course>>() {
                }).block();
    }
}
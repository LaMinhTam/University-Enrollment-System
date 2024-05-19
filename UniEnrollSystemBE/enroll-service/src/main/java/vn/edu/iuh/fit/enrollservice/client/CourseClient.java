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
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/courses/by-ids").queryParam("courseIds", String.join(",", courseIds)).build())
                .header("major_id", String.valueOf(majorId))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Course>>() {
                }).block();
    }
}
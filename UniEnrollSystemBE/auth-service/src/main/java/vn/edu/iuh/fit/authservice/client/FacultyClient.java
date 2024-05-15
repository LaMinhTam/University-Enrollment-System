package vn.edu.iuh.fit.authservice.client;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import vn.edu.iuh.fit.authservice.dtos.StudentDTO;

@Service
public class FacultyClient {
    private final WebClient webClient;

    public FacultyClient(WebClient webClient) {
        this.webClient = webClient;
    }

    public StudentDTO get(String id) {
        return webClient.get()
                .uri("http://api-gateway/faculties/students/{id}", id) // Change this to the API Gateway URL
                .retrieve()
                .bodyToMono(StudentDTO.class)
                .block();
    }
}
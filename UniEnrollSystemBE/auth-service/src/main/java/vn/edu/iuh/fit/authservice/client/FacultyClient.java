package vn.edu.iuh.fit.authservice.client;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import vn.edu.iuh.fit.authservice.dtos.StudentDTO;

@Service
public class FacultyClient {
    private final WebClient webClient;

    public FacultyClient(WebClient facultyWebClient) {
        this.webClient = facultyWebClient;
    }

    public StudentDTO get(String id) {
        return webClient.get()
                .uri("/students/{id}", id)
                .retrieve()
                .bodyToMono(StudentDTO.class).block();
    }
}
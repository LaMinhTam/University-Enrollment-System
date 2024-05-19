package vn.edu.iuh.fit.grademanagementservice.client;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import vn.edu.iuh.fit.grademanagementservice.dtos.MajorSemesterSummary;

import java.util.List;

@Service
public class FacultyClient {
    private final WebClient webClient;

    public FacultyClient(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<MajorSemesterSummary> getMajorSemesterSummary(int majorId, int year) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/faculties/major-semester-summary").queryParam("majorId", majorId).queryParam("year", year).build())
                .retrieve()
                .bodyToFlux(MajorSemesterSummary.class)
                .collectList()
                .block();
    }
}

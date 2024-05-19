package vn.edu.iuh.fit.enrollservice.client;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import vn.edu.iuh.fit.enrollservice.dtos.*;

import java.util.List;
import java.util.Map;

@Service
public class ScheduleClient {
    private final WebClient webClient;

    public ScheduleClient(WebClient scheduleWebClient) {
        this.webClient = scheduleWebClient;
    }

    public List<ConflictResponse> checkScheduleConflict(ScheduleConflictRequest request) {
        return webClient.post()
                .uri("/schedules/conflicts")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<ConflictResponse>>() {
                })
                .block();
    }

    public Map<String, ClassSchedule> getSchedules(ClassIdsRequest request) {
        String classIds = String.join(",", request.class_ids());
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/schedules/classes")
                        .queryParam("class_ids", classIds).build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, ClassSchedule>>() {
                })
                .block();
    }
}
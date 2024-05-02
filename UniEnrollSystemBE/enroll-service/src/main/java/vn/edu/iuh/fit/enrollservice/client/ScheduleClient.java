package vn.edu.iuh.fit.enrollservice.client;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.DeleteExchange;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;
import reactor.core.publisher.Mono;
import vn.edu.iuh.fit.enrollservice.dtos.*;

import java.util.List;
import java.util.Map;

@HttpExchange
public interface ScheduleClient {
    //in case i want non-blocking
//    @PostExchange("/schedules/registry")
//        public Mono<Void> registrySchedule(@RequestHeader("id") String studentId, @RequestParam("course_id") String courseId);
    @PostExchange("/schedules/registry")
    public List<ClassSchedule> registrySchedule(@RequestHeader("id") String studentId, @RequestParam("course_id") String courseId);

    @DeleteExchange("/schedules/cancel")
    public void cancelSchedule(@RequestHeader("id") String studentId, @RequestParam("class_id") String classId);

    @PostExchange("/schedules/conflicts")
    public List<ConflictResponse> checkScheduleConflict(@RequestBody ScheduleConflictRequest request);

    @GetExchange("/schedules/classes")
    public Map<String, ClassSchedule> getSchedules(@RequestBody ClassIdsRequest request);
}
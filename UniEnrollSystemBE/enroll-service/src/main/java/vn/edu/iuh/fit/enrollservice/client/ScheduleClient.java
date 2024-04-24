package vn.edu.iuh.fit.enrollservice.client;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.DeleteExchange;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;
import vn.edu.iuh.fit.enrollservice.dtos.ClassSchedule;

import java.util.List;

@HttpExchange
public interface ScheduleClient {
    @PostExchange("/schedules/registry")
    public List<ClassSchedule> registrySchedule(@RequestHeader("id") String studentId, @RequestParam("course_id") String courseId);

    @DeleteExchange("/schedules/cancel")
    public void cancelSchedule(@RequestHeader("id") String studentId, @RequestParam("class_id") String classId);
}
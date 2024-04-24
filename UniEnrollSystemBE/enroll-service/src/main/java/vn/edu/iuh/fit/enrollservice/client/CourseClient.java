package vn.edu.iuh.fit.enrollservice.client;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import vn.edu.iuh.fit.enrollservice.dtos.Course;

import java.util.List;

@HttpExchange
public interface CourseClient {
    @GetExchange("/courses/by-ids")
    public List<Course> getCoursesByIds(@RequestBody List<String> courseIds);
}

package vn.edu.iuh.fit.courseservice.services;

import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.courseservice.models.Course;

import java.util.List;
import java.util.Map;

@Service
public interface CourseService {

    Map<Integer, List<Course>> listAllCourseByMajorAndYear(int majorId, int year);

    List<Course> getCoursesByIds(List<String> courseIds);
}

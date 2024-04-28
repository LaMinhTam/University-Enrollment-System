package vn.edu.iuh.fit.courseservice.services;

import vn.edu.iuh.fit.courseservice.models.Course;

import java.util.List;
import java.util.Map;

public interface CourseService {

    Map<Integer, List<Course>> listAllCourseByMajorAndYear(int majorId, int year);

    List<Course> getCoursesByIds(List<String> courseIds);
}

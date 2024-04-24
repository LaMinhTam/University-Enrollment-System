package vn.edu.iuh.fit.courseservice.services;

import vn.edu.iuh.fit.courseservice.models.Course;

import java.util.List;

public interface CourseService {

    List<Course> listAllCourseByMajorAndYear(int majorId, int year);

    List<Course> getCoursesByIds(List<String> courseIds);
}

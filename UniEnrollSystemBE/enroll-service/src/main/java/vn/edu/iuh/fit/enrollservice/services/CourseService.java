package vn.edu.iuh.fit.enrollservice.services;

import vn.edu.iuh.fit.enrollservice.models.Course;

import java.util.List;

public interface CourseService {

    List<Course> listAllCourseByMajorAndYear(int majorId, int year);
}

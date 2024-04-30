package vn.edu.iuh.fit.courseservice.services;

import vn.edu.iuh.fit.courseservice.dtos.CourseDTO;
import vn.edu.iuh.fit.courseservice.dtos.ListCourseResponse;

import java.util.List;
import java.util.Map;

public interface CourseService {

    Map<Integer, List<CourseDTO>> listAllCourseByMajorAndYear(int majorId, int year);

    List<ListCourseResponse> getCoursesByIds(int marjorId, List<String> courseIds);
}

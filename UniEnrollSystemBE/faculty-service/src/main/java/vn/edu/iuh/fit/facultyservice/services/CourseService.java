package vn.edu.iuh.fit.facultyservice.services;

import vn.edu.iuh.fit.facultyservice.dtos.CourseDTO;

import java.util.List;

public interface CourseService {

    List<CourseDTO> listAllCourseByMajorAndYear(int majorId, int year);
}

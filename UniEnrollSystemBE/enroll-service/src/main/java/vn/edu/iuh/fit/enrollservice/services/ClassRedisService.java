package vn.edu.iuh.fit.enrollservice.services;

import vn.edu.iuh.fit.enrollservice.dtos.MapCourseClass;

import java.util.List;

public interface ClassRedisService {
    List<MapCourseClass> getAllCourses(int majorId, int semester, int year);

    void setAllCourses(int majorId, int semester, int year, List<MapCourseClass> courses);
}

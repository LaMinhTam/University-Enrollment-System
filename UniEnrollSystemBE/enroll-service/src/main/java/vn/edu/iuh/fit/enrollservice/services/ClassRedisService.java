package vn.edu.iuh.fit.enrollservice.services;

import vn.edu.iuh.fit.enrollservice.dtos.MapCourseClass;

import java.util.Map;

public interface ClassRedisService {
    Map<String , MapCourseClass> getAllCourses(int majorId, int semester, int year);

    void setAllCourses(int majorId, int semester, int year, Map<String , MapCourseClass> courses);
}

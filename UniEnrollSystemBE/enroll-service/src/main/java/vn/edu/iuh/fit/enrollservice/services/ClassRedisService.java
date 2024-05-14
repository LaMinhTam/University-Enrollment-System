package vn.edu.iuh.fit.enrollservice.services;

import vn.edu.iuh.fit.enrollservice.dtos.MapCourseClass;
import vn.edu.iuh.fit.enrollservice.models.Class;

import java.util.Map;

public interface ClassRedisService {
    Map<String, MapCourseClass> getAllCourses(int majorId, int semester, int year);

    void setAllCourses(int majorId, int semester, int year, Map<String, MapCourseClass> courses);

    void updateStudentCount(int majorId, int semester, int year,String courseId, String classId, int group, int updateValue) throws Exception;
}

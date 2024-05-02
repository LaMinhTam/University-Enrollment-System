package vn.edu.iuh.fit.enrollservice.services;

import vn.edu.iuh.fit.enrollservice.dtos.MapCourseClass;
import vn.edu.iuh.fit.enrollservice.models.Class;

import java.util.Map;

public interface ClassRedisService {
    Map<String, MapCourseClass> getAllCourses(int majorId, int semester, int year);

    public void validateClassAndGroupForRegistration(int majorId, Class targetClass, int group) throws Exception;

    void setAllCourses(int majorId, int semester, int year, Map<String, MapCourseClass> courses);

    void clearCache(int majorId, int semester, int year);
}

package vn.edu.iuh.fit.scheduleservice.services;

import vn.edu.iuh.fit.scheduleservice.models.ClassSchedule;

import java.util.List;

public interface ClassScheduleService {
    List<ClassSchedule> getAllSchedule(String studentId);

    List<ClassSchedule> registrySchedule(String studentId, String courseId);

    void cancelSchedule(String studentId, String classId);
}

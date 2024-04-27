package vn.edu.iuh.fit.scheduleservice.services;

import vn.edu.iuh.fit.scheduleservice.dtos.DateRequest;
import vn.edu.iuh.fit.scheduleservice.models.ClassSchedule;
import vn.edu.iuh.fit.scheduleservice.models.Schedule;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface ClassScheduleService {
    List<ClassSchedule> getAllSchedule(String studentId);

    List<ClassSchedule> registrySchedule(String studentId, String courseId);

    void cancelSchedule(String studentId, String classId);

    List<ClassSchedule> getScheduleByClassIds(List<String> id);

    Map<Integer, List<Schedule>> getScheduleByDate(DateRequest dateRequest) throws ParseException;
}

package vn.edu.iuh.fit.scheduleservice.services;

import vn.edu.iuh.fit.scheduleservice.dtos.*;
import vn.edu.iuh.fit.scheduleservice.models.ClassSchedule;
import vn.edu.iuh.fit.scheduleservice.models.StudentSchedule;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface ClassScheduleService {
    List<ClassSchedule> getAllSchedule(String studentId);

    StudentSchedule registrySchedule(String studentId, String courseId, int group);

    void cancelSchedule(String studentId, String classId);

    Map<String, ClassSchedule> getScheduleByClassIds(List<String> id);

    List<WeekScheduleDTO> getScheduleByDate(String studentId, DateRequest dateRequest) throws ParseException;

    void changeSchedule(String newClassId, String oldClassId, String studentId);

    List<QueryClassSchedule> getEachScheduleByClassIds(List<EnrollGroup> enrollGroups);
}

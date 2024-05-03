package vn.edu.iuh.fit.scheduleservice.services;

import vn.edu.iuh.fit.scheduleservice.dtos.*;
import vn.edu.iuh.fit.scheduleservice.models.ClassSchedule;
import vn.edu.iuh.fit.scheduleservice.models.StudentSchedule;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface ClassScheduleService {
    List<ClassSchedule> getAllSchedule(String studentId);

    StudentSchedule registrySchedule(String studentId, String courseId);

    void cancelSchedule(String studentId, String classId);

    Map<String, ClassSchedule> getScheduleByClassIds(List<String> id);

    List<WeekScheduleDTO> getScheduleByDate(String studentId, DateRequest dateRequest) throws ParseException;

    List<QueryClassSchedule> getEachScheduleByClassIds(List<String> ids);

    void changeSchedule(ChangeScheduleRequest request);

    List<ConflictResponse> getScheduleConflicts(ScheduleConflictRequest request);
}

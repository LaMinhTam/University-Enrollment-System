package vn.edu.iuh.fit.scheduleservice.services;

import vn.edu.iuh.fit.scheduleservice.dtos.ConflictResponse;
import vn.edu.iuh.fit.scheduleservice.dtos.DateRequest;
import vn.edu.iuh.fit.scheduleservice.dtos.QueryClassSchedule;
import vn.edu.iuh.fit.scheduleservice.dtos.WeekScheduleDTO;
import vn.edu.iuh.fit.scheduleservice.models.ClassSchedule;

import java.text.ParseException;
import java.util.List;

public interface ClassScheduleService {
    List<ClassSchedule> getAllSchedule(String studentId);

    List<ClassSchedule> registrySchedule(String studentId, String courseId);

    void cancelSchedule(String studentId, String classId);

    List<ClassSchedule> getScheduleByClassIds(List<String> id);

    List<WeekScheduleDTO> getScheduleByDate(String studentId, DateRequest dateRequest) throws ParseException;

    List<QueryClassSchedule> getEachScheduleByClassIds(List<String> ids);

    List<ConflictResponse> getScheduleConflicts(List<String> enrolledClassIds, String newClassId);
}

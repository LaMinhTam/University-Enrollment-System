package vn.edu.iuh.fit.enrollservice.dtos;

import java.util.List;

public record ClassSchedule(
        String classId,
        String courseId,
        String courseName,
        List<Schedule> schedules
) {
}
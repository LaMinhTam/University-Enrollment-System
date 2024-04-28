package vn.edu.iuh.fit.scheduleservice.dtos;

import vn.edu.iuh.fit.scheduleservice.models.Schedule;

public record QueryClassSchedule(String classId, String courseId, String courseName, Schedule schedules) {
}

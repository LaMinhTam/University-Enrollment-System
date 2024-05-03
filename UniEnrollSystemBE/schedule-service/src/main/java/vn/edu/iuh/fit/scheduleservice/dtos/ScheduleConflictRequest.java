package vn.edu.iuh.fit.scheduleservice.dtos;

import java.util.List;

public record ScheduleConflictRequest(List<String> enrolledClassIds, String newClassId, int groupId) {
}
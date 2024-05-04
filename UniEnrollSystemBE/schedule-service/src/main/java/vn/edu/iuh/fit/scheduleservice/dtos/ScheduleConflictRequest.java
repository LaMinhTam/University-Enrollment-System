package vn.edu.iuh.fit.scheduleservice.dtos;

import java.util.List;

public record ScheduleConflictRequest(List<EnrollGroup> enrollGroups, String newClassId, int groupId) {
}
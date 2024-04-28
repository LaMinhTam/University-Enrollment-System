package vn.edu.iuh.fit.enrollservice.dtos;

import java.util.List;

public record ScheduleConflictRequest(List<String> enrolledClassIds, String newClassId) {
}
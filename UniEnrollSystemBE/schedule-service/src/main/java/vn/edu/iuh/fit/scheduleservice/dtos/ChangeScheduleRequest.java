package vn.edu.iuh.fit.scheduleservice.dtos;

public record ChangeScheduleRequest(String studentId, String oldClassId, String newClassId) {
}

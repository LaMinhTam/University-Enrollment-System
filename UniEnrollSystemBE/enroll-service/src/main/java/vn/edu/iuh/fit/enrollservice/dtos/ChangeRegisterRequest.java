package vn.edu.iuh.fit.enrollservice.dtos;

public record ChangeScheduleRequest(String studentId, String oldClassId, String newClassId) {
}

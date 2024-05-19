package vn.edu.iuh.fit.notificationservice.dtos;

public record ChangeRegisterRequest(String studentId, String oldClassId, String newClassId) {
}

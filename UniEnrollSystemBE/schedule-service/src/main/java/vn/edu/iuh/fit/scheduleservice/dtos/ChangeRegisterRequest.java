package vn.edu.iuh.fit.scheduleservice.dtos;

public record ChangeRegisterRequest(String studentId, String oldClassId, String newClassId) {
}

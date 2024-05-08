package vn.edu.iuh.fit.enrollservice.dtos;

public record ChangeRegisterRequest(String studentId, String oldClassId, String newClassId) {
}

package vn.edu.iuh.fit.paymentservice.dtos;

public record ChangeRegisterRequest(String studentId, String oldClassId, String newClassId) {
}

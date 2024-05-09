package vn.edu.iuh.fit.paymentservice.dtos;

public record RegisterRequest(
        String studentId,
        String classId,
        String courseId,
        String courseName,
        int year,
        int semester,
        Double amount,
        int credit) {
}

package vn.edu.iuh.fit.enrollservice.dtos;

public record RegisterRequest(String studentId, String classId, int group,
                              String courseId,
                              String courseName,
                              int year,
                              int semester,
                              Double amount,
                              int credit) {
}

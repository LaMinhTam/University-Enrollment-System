package vn.edu.iuh.fit.notificationservice.dtos;

public record RegisterRequest(String studentId,
                              String classId,
                              String courseId,
                              String courseName,
                              Double amount,
                              int credit,
                              int theoryCredit,
                              int practicalCredit) {

}

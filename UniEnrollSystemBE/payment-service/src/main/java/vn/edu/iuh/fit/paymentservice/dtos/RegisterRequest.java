package vn.edu.iuh.fit.paymentservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String studentId;
    private String classId;
    private String courseId;
    private String courseName;
    private int year;
    private int semester;
    private Double amount;
    private int credit;
    private int theoryCredit;
    private int practicalCredit;
}

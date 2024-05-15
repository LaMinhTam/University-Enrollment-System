package vn.edu.iuh.fit.enrollservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.iuh.fit.enrollservice.models.PaymentStatus;

import java.io.Serializable;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CoursePayment implements Serializable {
    private String classId;
    private String courseId;
    private String courseName;
    private int credit;
//    private String studentId;
    private Date createAt;
    private Date updateAt;
    private int semester;
    private int year;
    private Double amount;
//    private Double deduct;
//    private Double total;
    private PaymentStatus status;
}

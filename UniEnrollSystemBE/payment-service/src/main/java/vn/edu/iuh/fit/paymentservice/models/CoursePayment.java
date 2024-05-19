package vn.edu.iuh.fit.paymentservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.Date;

@Document
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CoursePayment implements Serializable {
    @Field("class_id")
    private String classId;
    @Field("course_id")
    private String courseId;
    @Field("course_name")
    private String courseName;
    private int credit;
    @Field("student_id")
    private String studentId;
    private Date create_at;
    private Date update_at;
    private int semester;
    private int year;
    private Double amount;
    private Double deduct;
    private Double total;
    @Field("payment_status")
    private PaymentStatus status;
}

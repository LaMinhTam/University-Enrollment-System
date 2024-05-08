package vn.edu.iuh.fit.paymentservice;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Document
public class CoursePayment {
    @Field("class_id")
    private String classId;
    @Field("course_id")
    private String courseId;
    private String content;
    @Field("student_id")
    private String studentId;
    private Date create_at;
    private Double amount;
    private Double deduct;
    private Double total;
    private  status;
}

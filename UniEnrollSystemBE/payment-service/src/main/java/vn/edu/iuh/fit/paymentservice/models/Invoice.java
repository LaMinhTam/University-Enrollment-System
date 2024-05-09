package vn.edu.iuh.fit.paymentservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Invoice implements Serializable {
    //format: xyyzzzzzd, with x is register semester, yy is register year, zzzzz is invoice numerical order, and d is type 1 is a coursePayment, 0 is a servicePayment
    @MongoId
    @Field("_id")
    private String id;
    @Field("student_id")
    private String studentId;
    private Double amount;
    @Field("create_at")
    private Date createAt;
    @Field("collecting_unit")
    private String collectingUnit;
    @Field("course_payments")
    private List<CoursePayment> coursePayments;
    private PaymentStatus status;
}

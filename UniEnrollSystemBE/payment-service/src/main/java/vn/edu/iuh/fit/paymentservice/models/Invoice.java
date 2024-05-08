package vn.edu.iuh.fit.paymentservice.models;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Date;
import java.util.List;

@Document
@AllArgsConstructor
@NoArgsConstructor
public class Invoice {
    //format: xyyzzzzzd, with x is register semester, yy is register year, zzzzz is invoice numerical order, and d is type 1 is a coursePayment, 0 is a servicePayment
    @MongoId
    private String id;
    private String studentId;
    private Double amount;
    @Field("create_at")
    private Date createAt;
    private String collectingUnit;
    private List<CoursePayment> coursePayments;
    private PaymentStatus status;
}

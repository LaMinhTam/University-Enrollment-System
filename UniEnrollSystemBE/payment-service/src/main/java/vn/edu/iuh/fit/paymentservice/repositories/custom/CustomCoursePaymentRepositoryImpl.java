package vn.edu.iuh.fit.paymentservice.repositories.custom;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import vn.edu.iuh.fit.paymentservice.models.CoursePayment;
import vn.edu.iuh.fit.paymentservice.models.PaymentStatus;

import java.util.List;

public class CustomCoursePaymentRepositoryImpl implements CustomCoursePaymentRepository {
    private final MongoTemplate mongoTemplate;

    public CustomCoursePaymentRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public void updateClassId(String studentId, String newClassId, String oldClassId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("student_id").is(studentId).and("class_id").is(oldClassId));

        Update update = new Update();
        update.set("class_id", newClassId);

        mongoTemplate.updateFirst(query, update, CoursePayment.class);
    }

    @Override
    public void updatePaymentStatus(String studentId, List<String> classIds, PaymentStatus paymentStatus) {
        Query query = new Query();
        query.addCriteria(Criteria.where("student_id").is(studentId).and("class_id").in(classIds));

        Update update = new Update();
        update.set("payment_status", paymentStatus);

        mongoTemplate.updateMulti(query, update, CoursePayment.class);
    }
}

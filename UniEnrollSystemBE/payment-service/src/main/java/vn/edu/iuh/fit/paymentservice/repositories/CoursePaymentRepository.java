package vn.edu.iuh.fit.paymentservice.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.paymentservice.models.CoursePayment;
import vn.edu.iuh.fit.paymentservice.repositories.custom.CustomCoursePaymentRepository;

import java.net.ContentHandler;
import java.util.List;

@Repository
public interface CoursePaymentRepository extends MongoRepository<CoursePayment, String>, CustomCoursePaymentRepository {
    Page<CoursePayment> findByStudentId(String studentId, Pageable pageable);

    void deleteByStudentIdAndClassId(String studentId, String classId);

    List<CoursePayment> findByStudentIdAndClassIdIn(String studentId, List<String> strings);
}

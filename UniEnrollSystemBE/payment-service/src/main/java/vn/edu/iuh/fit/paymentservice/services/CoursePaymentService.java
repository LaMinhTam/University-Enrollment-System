package vn.edu.iuh.fit.paymentservice.services;

import vn.edu.iuh.fit.paymentservice.dtos.RegisterRequest;
import vn.edu.iuh.fit.paymentservice.models.CoursePayment;
import vn.edu.iuh.fit.paymentservice.models.PaymentStatus;

import java.util.List;

public interface CoursePaymentService {
    List<CoursePayment> getAllCoursePayments(String studentId, int page, int size);

    void register(RegisterRequest request);

    void cancelRegister(String studentId, String classId);

    void changeSchedule(String studentId, String newClassId, String oldClassId);

    List<CoursePayment> getCoursePaymentsById(String studentId, List<String> strings);

    void updatePaymentStatus(String studentId, List<String> classIds, PaymentStatus paymentStatus);
}

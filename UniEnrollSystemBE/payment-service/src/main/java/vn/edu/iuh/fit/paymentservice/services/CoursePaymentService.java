package vn.edu.iuh.fit.paymentservice.services;

import vn.edu.iuh.fit.paymentservice.dtos.RegisterRequest;
import vn.edu.iuh.fit.paymentservice.models.CoursePayment;
import vn.edu.iuh.fit.paymentservice.models.PaymentStatus;

import java.util.List;
import java.util.Map;

public interface CoursePaymentService {
    Map<String, List<CoursePayment>> getAllCoursePaymentsPage(String studentId, int page, int size);

    void register(RegisterRequest request);

    void cancelRegister(String studentId, String classId);

    void changeSchedule(String studentId, String newClassId, String oldClassId);

    List<CoursePayment> getCoursePaymentsById(String studentId, List<String> strings);

    void updatePaymentStatus(String studentId, List<String> classIds, PaymentStatus paymentStatus);

    Map<String, CoursePayment> getCoursePaymentsBySemesterAndYear(String studentId, int semester, int year);

    List<CoursePayment> getAllCoursePaymentsSemester(String studentId, int semester, int year);
}

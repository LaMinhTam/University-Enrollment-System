package vn.edu.iuh.fit.paymentservice.repositories.custom;

import vn.edu.iuh.fit.paymentservice.models.PaymentStatus;

import java.util.List;

public interface CustomCoursePaymentRepository {
    void updateClassId(String studentId, String newClassId, String oldClassId);

    void updatePaymentStatus(String studentId, List<String> classIds, PaymentStatus paymentStatus);
}

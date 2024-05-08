package vn.edu.iuh.fit.paymentservice.repositories.custom;

public interface CustomCoursePaymentRepository {
    void updateClassId(String studentId, String newClassId, String oldClassId);
}

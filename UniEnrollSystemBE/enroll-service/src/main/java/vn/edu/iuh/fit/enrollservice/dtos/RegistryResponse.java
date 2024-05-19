package vn.edu.iuh.fit.enrollservice.dtos;

import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.models.ClassStatus;
import vn.edu.iuh.fit.enrollservice.models.Enrollment;
import vn.edu.iuh.fit.enrollservice.models.PaymentStatus;

import java.util.Date;

public record RegistryResponse(
        String id,
        String courseId,
        String courseName,
        int semester,
        int year,
        int maxCapacity,
        ClassStatus status,
        int group,
        int credit,
        Date updateAt,
        PaymentStatus paymentStatus,
        Double fee) {
    public RegistryResponse(Class targetClass, Enrollment enrollment, CoursePayment coursePayment) {
        this(
                targetClass.getId(),
                targetClass.getCourseId(),
                targetClass.getCourseName(),
                targetClass.getSemester(),
                targetClass.getYear(),
                targetClass.getMaxCapacity(),
                targetClass.getStatus(),
                enrollment.getGroup(),
                coursePayment == null ? 0 : coursePayment.getCredit(),
                enrollment.getUpdatedAt(),
                coursePayment == null ? PaymentStatus.ERROR : enrollment.getStatus(),
                coursePayment == null ? 0.0 : coursePayment.getAmount()
        );
    }
}

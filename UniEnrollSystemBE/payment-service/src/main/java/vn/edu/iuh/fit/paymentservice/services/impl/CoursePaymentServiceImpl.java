package vn.edu.iuh.fit.paymentservice.services.impl;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.paymentservice.dtos.RegisterRequest;
import vn.edu.iuh.fit.paymentservice.models.CoursePayment;
import vn.edu.iuh.fit.paymentservice.models.PaymentStatus;
import vn.edu.iuh.fit.paymentservice.repositories.CoursePaymentRepository;
import vn.edu.iuh.fit.paymentservice.services.CoursePaymentService;

import java.util.Date;
import java.util.List;

@Service
public class CoursePaymentServiceImpl implements CoursePaymentService {
    private final CoursePaymentRepository coursePaymentRepository;

    public CoursePaymentServiceImpl(CoursePaymentRepository coursePaymentRepository) {
        this.coursePaymentRepository = coursePaymentRepository;
    }

    @Override
    public List<CoursePayment> getAllCoursePayments(String studentId, int page, int size) {
        Sort sort = Sort.by(Sort.Order.asc("semester"), Sort.Order.asc("year"));
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        return coursePaymentRepository.findByStudentId(studentId, pageable).getContent();
    }

    @Override
    public void register(RegisterRequest request) {
        coursePaymentRepository.save(new CoursePayment(request.classId(), request.courseId(), request.courseName(), request.credit(), request.studentId(), new Date(), new Date(), request.semester(), request.year(),request.amount(), 0.0, request.amount(), PaymentStatus.PENDING));
    }

    @Override
    public void cancelRegister(String studentId, String classId) {
        coursePaymentRepository.deleteByStudentIdAndClassId(studentId, classId);
    }

    @Override
    public void changeSchedule(String studentId, String newClassId, String oldClassId) {
        coursePaymentRepository.updateClassId(studentId, newClassId, oldClassId);
    }

    @Override
    public List<CoursePayment> getCoursePaymentsById(String studentId, List<String> strings) {
        return coursePaymentRepository.findByStudentIdAndClassIdIn(studentId, strings);
    }

    @Override
    public void updatePaymentStatus(String studentId, List<String> classIds, PaymentStatus paymentStatus) {
        coursePaymentRepository.updatePaymentStatus(studentId, classIds, paymentStatus);
    }
}

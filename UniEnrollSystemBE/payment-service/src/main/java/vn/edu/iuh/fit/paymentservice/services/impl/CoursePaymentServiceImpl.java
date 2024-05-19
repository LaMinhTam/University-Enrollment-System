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
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class CoursePaymentServiceImpl implements CoursePaymentService {
    private final CoursePaymentRepository coursePaymentRepository;

    public CoursePaymentServiceImpl(CoursePaymentRepository coursePaymentRepository) {
        this.coursePaymentRepository = coursePaymentRepository;
    }

    @Override
    public Map<String, List<CoursePayment>> getAllCoursePaymentsPage(String studentId, int page, int size) {
        Sort sort = Sort.by(Sort.Order.asc("semester"), Sort.Order.asc("year"));
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        List<CoursePayment> coursePayments = coursePaymentRepository.findByStudentId(studentId, pageable).getContent();
        //a map with key is semester-year and value is list of course payment
        return coursePayments.stream().collect(Collectors.groupingBy(coursePayment -> coursePayment.getSemester() + "-" + coursePayment.getYear()));
    }

    @Override
    public List<CoursePayment> getAllCoursePaymentsSemester(String studentId, int semester, int year) {
        return coursePaymentRepository.findByStudentIdAndSemesterAndYear(studentId, semester, year);
    }

    @Override
    public void register(RegisterRequest request) {
        coursePaymentRepository.save(new CoursePayment(request.getClassId(), request.getCourseId(), request.getCourseName(), request.getCredit(), request.getStudentId(), new Date(), new Date(), request.getSemester(), request.getYear(), request.getAmount(), 0.0, request.getAmount(), PaymentStatus.UNPAID));
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

    @Override
    public Map<String, CoursePayment> getCoursePaymentsBySemesterAndYear(String studentId, int semester, int year) {
        return coursePaymentRepository.findByStudentIdAndSemesterAndYear(studentId, semester, year).stream().collect(Collectors.toMap(CoursePayment::getClassId, Function.identity()));
    }
}

package vn.edu.iuh.fit.enrollservice.services.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;
import vn.edu.iuh.fit.enrollservice.models.PaymentStatus;
import vn.edu.iuh.fit.enrollservice.dtos.RegistryRequest;
import vn.edu.iuh.fit.enrollservice.dtos.RequestChangeClass;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.models.ClassStatus;
import vn.edu.iuh.fit.enrollservice.models.Enrollment;
import vn.edu.iuh.fit.enrollservice.repositories.ClassRepository;
import vn.edu.iuh.fit.enrollservice.repositories.EnrollmentRepository;
import vn.edu.iuh.fit.enrollservice.services.EnrollmentService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final ClassRepository classRepository;

    public EnrollmentServiceImpl(EnrollmentRepository enrollmentRepository, ClassRepository classRepository, TransactionTemplate transactionTemplate) {
        this.enrollmentRepository = enrollmentRepository;
        this.classRepository = classRepository;
    }

    private void handleStatusCode(int statusCode) throws RuntimeException {
        switch (statusCode) {
            case 409:
                throw new RuntimeException("Lớp học đã đủ số lượng sinh viên");
            case 400:
                throw new RuntimeException("Bạn đã đăng ký lớp học này rồi");
            case 423:
                throw new RuntimeException("Lớp học đã đóng, không thể đăng ký");
            case 425:
                throw new RuntimeException("Lớp học đang trong quá trình lên kế hoạch, không thể đăng ký");
            case 422:
                throw new RuntimeException("Lớp mới và lớp cũ không cùng môn học");
            case 406:
                throw new RuntimeException("Lớp học đã mở không thể đổi lớp khác");
            default:
                break;
        }
    }

    public boolean registerClass(String studentId, RegistryRequest request) throws RuntimeException {
        int statusCode = enrollmentRepository.registerClass(studentId, request.class_id(), request.group());
        handleStatusCode(statusCode);
        return true;
    }

    public boolean changeClass(String studentId, RequestChangeClass request) throws RuntimeException {
        int statusCode = enrollmentRepository.changeClass(studentId, request.old_class_id(), request.new_class_id(), request.group());
        handleStatusCode(statusCode);
        return true;
    }

    @Override
    public Enrollment cancelEnrollment(String studentId, String classId) {
        Class registryClass = classRepository.findById(classId).orElseThrow(() -> new RuntimeException("Không tìm thấy lớp học"));
        if (registryClass.getStatus() == ClassStatus.OPENED) {
            throw new RuntimeException("Không thể hủy đăng ký lớp học đã mở");
        } else {
            Enrollment enrollment = enrollmentRepository.findByStudentIdAndRegistryClass(studentId, classId).orElseThrow(() -> new RuntimeException("Không tìm thấy đăng ký"));
            enrollmentRepository.delete(enrollment);
            return enrollment;
        }
    }

    @Override
    public List<Enrollment> getRegistryClassBySemesterAndYear(String studentId, int semester, int year) {
        return enrollmentRepository.findEnrollmentsIncludingSemesterAndYear(studentId, semester, year);
    }

    @Override
    public List<Enrollment> getRegistryClassNotInSemesterAndYear(String studentId, int semester, int year) {
        return enrollmentRepository.findEnrollmentsExcludingSemesterAndYear(studentId, semester, year);
    }

    @Override
    public Class getClassById(String classId) {
        return classRepository.findById(classId).orElseThrow(() -> new RuntimeException("Không tìm thấy lớp học"));
    }


    @Override
    public List<String> validateAndPrepareRegistration(String studentId, RegistryRequest request, Class targetClass) throws RuntimeException {
        String courseId = targetClass.getCourseId();
        List<Enrollment> enrollments = getRegistryClassBySemesterAndYear(studentId, targetClass.getSemester(), targetClass.getYear());
        if (targetClass.getStatus() == ClassStatus.CLOSED) {
            throw new RuntimeException("Lớp học đã đóng, không thể đăng ký");
        } else if (targetClass.getStatus() == ClassStatus.PLANNING) {
            throw new RuntimeException("Lớp học đang trong quá trình lên kế hoạch, không thể đăng ký");
        } else if (enrollments.stream().anyMatch(enrollment -> enrollment.getRegistryClass().equals(request.class_id()))) {
            throw new RuntimeException("Bạn đã đăng ký lớp học này rồi");
        } else if (enrollments.stream().anyMatch(enrollment -> enrollment.getCourseId().equals(courseId))) {
            throw new RuntimeException("Bạn đã đăng ký một lớp học khác cho môn học này");
        }
        return enrollments.stream()
                .map(Enrollment::getRegistryClass)
                .collect(Collectors.toList());
    }

    @Override
    public List<String> validateAndPrepareRegistration(String studentId, RequestChangeClass request, Class targetClass) {
        if (request.old_class_id().equals(request.new_class_id())) {
            throw new RuntimeException("Lớp mới và lớp cũ không thể giống nhau");
        }
        targetClass.setClassDetails(getClassById(request.new_class_id()));
        List<Enrollment> enrollments = getRegistryClassBySemesterAndYear(studentId, targetClass.getSemester(), targetClass.getYear());
        if (targetClass.getStatus() == ClassStatus.CLOSED) {
            throw new RuntimeException("Lớp học đã đóng, không thể đăng ký");
        } else if (targetClass.getStatus() == ClassStatus.PLANNING) {
            throw new RuntimeException("Lớp học đang trong quá trình lên kế hoạch, không thể đăng ký");
        } else if (enrollments.stream()
                .noneMatch(enrollment -> enrollment.getRegistryClass().equals(request.old_class_id()))) {
            throw new RuntimeException("Bạn chưa đăng ký lớp học này " + request.old_class_id());
        }

        return enrollments.stream()
                .map(Enrollment::getRegistryClass)
                .filter(classId -> !classId.equals(request.old_class_id()))
                .collect(Collectors.toList());
    }

    @Override
    public void updateEnrollmentStatus(String studentId, List<String> classIds, PaymentStatus status) {
        List<Enrollment> enrollments = enrollmentRepository.findEnrollmentByStudentIdAndRegistryClassIn(studentId, classIds);
        enrollments.forEach(enrollment -> {
            enrollment.setStatus(status);
        });
        enrollmentRepository.saveAll(enrollments);
    }
}

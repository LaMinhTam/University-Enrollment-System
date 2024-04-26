package vn.edu.iuh.fit.enrollservice.services.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.models.ClassStatus;
import vn.edu.iuh.fit.enrollservice.models.Enrollment;
import vn.edu.iuh.fit.enrollservice.repositories.ClassRepository;
import vn.edu.iuh.fit.enrollservice.repositories.EnrollmentRepository;
import vn.edu.iuh.fit.enrollservice.services.EnrollmentService;

import java.util.Date;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final ClassRepository classRepository;

    public EnrollmentServiceImpl(EnrollmentRepository enrollmentRepository, ClassRepository classRepository, TransactionTemplate transactionTemplate) {
        this.enrollmentRepository = enrollmentRepository;
        this.classRepository = classRepository;
    }

    public Enrollment registryClass(String studentId, String classId) throws RuntimeException {
        int statusCode = enrollmentRepository.registerClass(studentId, classId);

        if (statusCode == 409) {
            throw new RuntimeException("Lớp học đã đủ số lượng sinh viên");
        } else if (statusCode == 400) {
            throw new RuntimeException("Bạn đã đăng ký lớp học này rồi");
        } else if (statusCode == 423) {
            throw new RuntimeException("Lớp học đã đóng, không thể đăng ký");
        } else if (statusCode == 425) {
            throw new RuntimeException("Lớp học đang trong quá trình lên kế hoạch, không thể đăng ký");
        }
        return new Enrollment(studentId, classId, new Date());
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
}

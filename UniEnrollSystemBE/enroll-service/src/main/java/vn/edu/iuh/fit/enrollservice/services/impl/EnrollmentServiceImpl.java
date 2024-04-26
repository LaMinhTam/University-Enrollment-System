package vn.edu.iuh.fit.enrollservice.services.impl;

import org.springframework.stereotype.Service;
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

    public EnrollmentServiceImpl(EnrollmentRepository enrollmentRepository, ClassRepository classRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.classRepository = classRepository;
    }

    public Enrollment registryClass(String studentId, String classId) throws RuntimeException {
        Class registryClass = classRepository.findById(classId).orElseThrow(() -> new RuntimeException("Không tìm thấy lớp học"));
        if (enrollmentRepository.countByStudentIdAndRegistryClass(studentId, classId) >= registryClass.getMaxCapacity()) {
            throw new RuntimeException("Lớp học đã đủ số lượng sinh viên");
        } else if (enrollmentRepository.findByStudentIdAndRegistryClass(studentId, classId).isPresent()) {
            throw new RuntimeException("Bạn đã đăng ký lớp học này rồi");
        } else if (registryClass.getStatus() == ClassStatus.CLOSED) {
            throw new RuntimeException("Lớp học đã đóng, không thể đăng ký");
        } else if (registryClass.getStatus() == ClassStatus.OPENED) {
            throw new RuntimeException("Lớp học đã chấp nhận mở lớp, không thể đăng ký");
        } else if (registryClass.getStatus() == ClassStatus.PLANNING) {
            throw new RuntimeException("Lớp học đang trong quá trình lên kế hoạch, không thể đăng ký");
        }
        Enrollment enrollment = new Enrollment(studentId, registryClass.getId().toString(), registryClass.getSemester(), registryClass.getYear(), new Date());
        return enrollmentRepository.save(enrollment);
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

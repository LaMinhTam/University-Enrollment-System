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
import java.util.List;

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

    public boolean registerClass(String studentId, String classId) throws RuntimeException {
        int statusCode = enrollmentRepository.registerClass(studentId, classId);
        handleStatusCode(statusCode);
        return true;
    }

    public boolean changeClass(String studentId, String oldClassId, String newClassId) throws RuntimeException {
        int statusCode = enrollmentRepository.changeClass(studentId, oldClassId, newClassId);
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
    public List<Enrollment> getRegistryClass(String studentId, int semester, int year) {
        return enrollmentRepository.findByStudentIdAndSemesterAndYear(studentId, semester, year);
    }

    @Override
    public Class getClassById(String classId) {
        Class classFindById = classRepository.findById(classId).orElseThrow(() -> new RuntimeException("Không tìm thấy lớp học"));
        if (classFindById.getStatus() == ClassStatus.CLOSED) {
            throw new RuntimeException("Lớp học đã đóng, không thể đăng ký");
        } else if (classFindById.getStatus() == ClassStatus.PLANNING) {
            throw new RuntimeException("Lớp học đang trong quá trình lên kế hoạch, không thể đăng ký");
        }
        return classFindById;
    }
}

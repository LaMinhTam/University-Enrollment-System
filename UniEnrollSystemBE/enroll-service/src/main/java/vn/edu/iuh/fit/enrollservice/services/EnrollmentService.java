package vn.edu.iuh.fit.enrollservice.services;

import vn.edu.iuh.fit.enrollservice.dtos.CheckoutClassRequest;
import vn.edu.iuh.fit.enrollservice.models.PaymentStatus;
import vn.edu.iuh.fit.enrollservice.dtos.RegistryRequest;
import vn.edu.iuh.fit.enrollservice.dtos.RequestChangeClass;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.models.Enrollment;

import java.util.List;

public interface EnrollmentService {
    public boolean registerClass(String studentId, RegistryRequest request) throws RuntimeException, InterruptedException;

    public boolean changeClass(String studentId, RequestChangeClass request) throws RuntimeException;

    Enrollment cancelEnrollment(String studentId, String classId);

    List<Enrollment> getRegistryClassBySemesterAndYear(String studentId, int semester, int year);
    List<Enrollment> getRegistryClassNotInSemesterAndYear(String studentId, int semester, int year);
    Class getClassById(String classId);

    List<String> validateAndPrepareRegistration(String studentId, RegistryRequest classId, Class newClass) throws RuntimeException;

    List<String> validateAndPrepareRegistration(String studentId, RequestChangeClass request, Class newClass);

    void updateEnrollmentStatus(String studentId, List<String> strings, PaymentStatus status);
}

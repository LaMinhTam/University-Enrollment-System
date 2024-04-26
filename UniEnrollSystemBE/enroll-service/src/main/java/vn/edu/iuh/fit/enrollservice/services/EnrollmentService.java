package vn.edu.iuh.fit.enrollservice.services;

import vn.edu.iuh.fit.enrollservice.models.Enrollment;

public interface EnrollmentService {
    public Enrollment registryClass(String studentId, String classId) throws RuntimeException, InterruptedException;

    Enrollment cancelEnrollment(String studentId, String classId);
}

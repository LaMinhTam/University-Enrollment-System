package vn.edu.iuh.fit.enrollservice.dtos;

import vn.edu.iuh.fit.enrollservice.models.Enrollment;

import java.util.List;

public record EnrollmentResponse(Enrollment enrollment, List<ClassSchedule> schedule) {
}

package vn.edu.iuh.fit.enrollservice.dtos;

import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.models.ClassStatus;
import vn.edu.iuh.fit.enrollservice.models.Enrollment;

public record RegistryResponse(
        String id,
        String courseId,
        String courseName,
        int semester,
        int year,
        int maxCapacity,
        ClassStatus status,
        int group,
        int credit) {
    public RegistryResponse(Class targetClass, Enrollment enrollment, Course course) {
        this(
                targetClass.getId(),
                targetClass.getCourseId(),
                targetClass.getCourseName(),
                targetClass.getSemester(),
                targetClass.getYear(),
                targetClass.getMaxCapacity(),
                targetClass.getStatus(),
                enrollment.getGroup(),
                course.credit()
        );
    }
}

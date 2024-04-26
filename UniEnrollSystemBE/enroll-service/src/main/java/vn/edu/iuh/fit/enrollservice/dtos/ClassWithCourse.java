package vn.edu.iuh.fit.enrollservice.dtos;

import vn.edu.iuh.fit.enrollservice.models.ClassStatus;

public record ClassWithCourse(

        String id,
        Course course,
        int semester,
        int year,
        int maxCapacity,
        ClassStatus status
) {
}

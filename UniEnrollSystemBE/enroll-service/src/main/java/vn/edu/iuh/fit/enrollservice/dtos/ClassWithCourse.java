package vn.edu.iuh.fit.enrollservice.dtos;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import org.springframework.data.mongodb.core.mapping.Field;
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

package vn.edu.iuh.fit.facultyservice.dtos;

import lombok.Data;
import lombok.ToString;
import vn.edu.iuh.fit.facultyservice.models.Student;

public record StudentDTO(
        String id,
        String name,
        int majorId,
        String majorName,
        int year,
        int facultyId,
        String facultyName
) {
}

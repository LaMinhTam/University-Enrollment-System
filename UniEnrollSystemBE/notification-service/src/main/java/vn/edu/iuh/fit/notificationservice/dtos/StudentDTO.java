package vn.edu.iuh.fit.authservice.dtos;

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
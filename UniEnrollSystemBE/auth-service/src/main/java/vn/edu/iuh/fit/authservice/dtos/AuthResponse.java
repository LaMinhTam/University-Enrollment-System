package vn.edu.iuh.fit.authservice.dtos;

import vn.edu.iuh.fit.authservice.models.Student;

public record AuthResponse(StudentDTO student,String accessToken, String refreshToken) {
}

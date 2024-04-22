package vn.edu.iuh.fit.authservice.dtos;

import vn.edu.iuh.fit.authservice.models.Student;

public record AuthResponse(String id, String fullName, String photos, String role,String accessToken, String refreshToken) {
}

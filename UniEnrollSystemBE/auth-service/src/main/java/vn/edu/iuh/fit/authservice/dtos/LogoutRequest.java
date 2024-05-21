package vn.edu.iuh.fit.authservice.dtos;

public record LogoutRequest(String accessToken, String refreshToken) {
}

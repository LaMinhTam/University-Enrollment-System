package vn.edu.iuh.fit.authservice.dtos;

public record ResponseWrapper(String message, Object data, int status) {
}

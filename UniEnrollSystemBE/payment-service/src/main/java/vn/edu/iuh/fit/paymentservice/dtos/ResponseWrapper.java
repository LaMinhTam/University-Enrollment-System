package vn.edu.iuh.fit.paymentservice.dtos;

public record ResponseWrapper(String message, Object data, int status) {
}

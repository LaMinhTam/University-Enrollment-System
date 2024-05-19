package vn.edu.iuh.fit.notificationservice.dtos;


import java.util.List;

public record CheckoutMessage(String studentId, List<CheckoutClassRequest> checkoutClassRequests, PaymentStatus status) {
}


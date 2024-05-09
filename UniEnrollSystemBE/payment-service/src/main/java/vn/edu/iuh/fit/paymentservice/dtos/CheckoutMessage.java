package vn.edu.iuh.fit.paymentservice.dtos;

import vn.edu.iuh.fit.paymentservice.models.PaymentStatus;

import java.util.List;

public record CheckoutMessage(String studentId, List<CheckoutClassRequest> checkoutClassRequests, PaymentStatus status) {
}


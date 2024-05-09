package vn.edu.iuh.fit.enrollservice.dtos;

import vn.edu.iuh.fit.enrollservice.models.PaymentStatus;

import java.util.List;

public record CheckoutMessage(String studentId, List<CheckoutClassRequest> checkoutClassRequests, PaymentStatus status) {
}


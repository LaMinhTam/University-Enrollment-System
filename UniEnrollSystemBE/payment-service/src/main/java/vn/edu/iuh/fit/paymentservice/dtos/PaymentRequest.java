package vn.edu.iuh.fit.paymentservice.dtos;

import java.util.List;

public record PaymentRequest(int amount, List<String> class_ids) {
}
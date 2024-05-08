package vn.edu.iuh.fit.paymentservice.controllers;

import java.util.List;

public record PaymentRequest(int amount, List<String> class_ids) {
}
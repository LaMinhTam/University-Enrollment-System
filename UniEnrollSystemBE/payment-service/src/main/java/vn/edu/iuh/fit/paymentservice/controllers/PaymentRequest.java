package vn.edu.iuh.fit.paymentservice.controllers;

public record PaymentRequest(int amount, String bankCode) {
}
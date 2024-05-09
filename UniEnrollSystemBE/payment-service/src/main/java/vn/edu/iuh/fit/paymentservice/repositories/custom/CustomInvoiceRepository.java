package vn.edu.iuh.fit.paymentservice.repositories.custom;

import vn.edu.iuh.fit.paymentservice.models.PaymentStatus;

public interface CustomInvoiceRepository {
    void updatePaymentStatus(String invoiceId, PaymentStatus paymentStatus);
}

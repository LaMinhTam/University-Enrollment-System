package vn.edu.iuh.fit.paymentservice.services;

import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.paymentservice.models.CoursePayment;
import vn.edu.iuh.fit.paymentservice.models.Invoice;
import vn.edu.iuh.fit.paymentservice.models.PaymentStatus;

import java.util.List;

public interface InvoiceService {

    List<Invoice> getAllInvoices(String studentId, int page, int size);

    Invoice updatePaymentStatus(String invoiceId, PaymentStatus paymentStatus);

    void createInvoice(String invoiceCode, String studentId, String collectingUnit, Double amount, List<CoursePayment> coursePayments);

    Invoice getInvoicesById(String invoiceId);
}

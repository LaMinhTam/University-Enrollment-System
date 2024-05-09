package vn.edu.iuh.fit.paymentservice.services.impl;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.paymentservice.models.CoursePayment;
import vn.edu.iuh.fit.paymentservice.models.Invoice;
import vn.edu.iuh.fit.paymentservice.models.PaymentStatus;
import vn.edu.iuh.fit.paymentservice.repositories.InvoiceRepository;
import vn.edu.iuh.fit.paymentservice.services.InvoiceService;

import java.util.Date;
import java.util.List;

@Service
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }


    @Override
    public List<Invoice> getAllInvoices(String studentId, int page, int size) {
        Sort sort = Sort.by(Sort.Order.asc("semester"), Sort.Order.asc("year"));
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        return invoiceRepository.findByStudentId(studentId, pageable).getContent();
    }

    @Override
    public Invoice updatePaymentStatus(String invoiceId, PaymentStatus paymentStatus) {
        Invoice invoice = invoiceRepository.findById(invoiceId).get();
        invoice.setStatus(paymentStatus);
        return invoiceRepository.save(invoice);
    }

    @Override
    public void createInvoice(String invoiceId, String studentId, String collectingUnit, Double amount, List<CoursePayment> coursePayments) {
        invoiceRepository.save(new Invoice(invoiceId, studentId, amount, new Date(), collectingUnit, coursePayments, PaymentStatus.PENDING));
    }

    @Override
    public Invoice getInvoicesById(String invoiceId) {
        return invoiceRepository.findById(invoiceId).orElseThrow(() -> new RuntimeException("Không tồn tại hóa đơn này"));
    }
}

package vn.edu.iuh.fit.paymentservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.paymentservice.models.Invoice;
import vn.edu.iuh.fit.paymentservice.services.InvoiceService;

import java.util.List;

@RestController
@RequestMapping("/invoices")
public class InvoiceController {
    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @GetMapping
    public List<Invoice> getInvoices(@RequestHeader("id") String studentId, @RequestHeader("page") int page, @RequestHeader("size") int size) {
        return invoiceService.getAllInvoices(studentId, page, size);
    }
}

package vn.edu.iuh.fit.paymentservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.paymentservice.dtos.ResponseWrapper;
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
    public ResponseEntity<?> getInvoices(@RequestHeader("id") String studentId, @RequestParam("page") int page, @RequestParam("size") int size) {
        return ResponseEntity.ok(new ResponseWrapper("Danh sách phiếu thu",invoiceService.getAllInvoices(studentId, page, size), 200));
    }
}

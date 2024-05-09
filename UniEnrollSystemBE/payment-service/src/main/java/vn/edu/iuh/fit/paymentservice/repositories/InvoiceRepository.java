package vn.edu.iuh.fit.paymentservice.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import vn.edu.iuh.fit.paymentservice.models.Invoice;
import vn.edu.iuh.fit.paymentservice.repositories.custom.CustomInvoiceRepository;

public interface InvoiceRepository extends MongoRepository<Invoice, String>, CustomInvoiceRepository {
    Page<Invoice> findByStudentId(String studentId, Pageable pageable);
}

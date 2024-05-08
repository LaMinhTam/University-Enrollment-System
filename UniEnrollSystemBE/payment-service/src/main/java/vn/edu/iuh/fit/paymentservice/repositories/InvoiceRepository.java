package vn.edu.iuh.fit.paymentservice.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import vn.edu.iuh.fit.paymentservice.models.Invoice;
import vn.edu.iuh.fit.paymentservice.repositories.custom.CustomInvoiceRepository;

import java.util.List;

public interface InvoiceRepository extends MongoRepository<Invoice, String>, CustomInvoiceRepository {
    List<Invoice> findByStudentId(String studentId, Pageable pageable);

}

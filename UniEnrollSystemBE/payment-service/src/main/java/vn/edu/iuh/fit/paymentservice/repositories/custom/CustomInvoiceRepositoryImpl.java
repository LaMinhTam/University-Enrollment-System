package vn.edu.iuh.fit.paymentservice.repositories.custom;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import vn.edu.iuh.fit.paymentservice.models.Invoice;
import vn.edu.iuh.fit.paymentservice.models.PaymentStatus;

public class CustomInvoiceRepositoryImpl implements CustomInvoiceRepository {
    private final MongoTemplate mongoTemplate;

    public CustomInvoiceRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }


    public void updatePaymentStatus(String invoiceId, PaymentStatus paymentStatus) {
        Query query = new Query(Criteria.where("_id").is(invoiceId));
        Update update = new Update().set("status", paymentStatus);
        mongoTemplate.updateFirst(query, update, Invoice.class);
    }
}

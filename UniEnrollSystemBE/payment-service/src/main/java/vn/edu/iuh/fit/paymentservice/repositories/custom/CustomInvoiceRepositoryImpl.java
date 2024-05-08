package vn.edu.iuh.fit.paymentservice.repositories.custom;

import org.springframework.data.mongodb.core.MongoTemplate;

public class CustomInvoiceRepositoryImpl implements CustomInvoiceRepository {
    private final MongoTemplate mongoTemplate;

    public CustomInvoiceRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }


}

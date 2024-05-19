package vn.edu.iuh.fit.paymentservice.message;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.paymentservice.dtos.CheckoutClassRequest;
import vn.edu.iuh.fit.paymentservice.dtos.CheckoutMessage;
import vn.edu.iuh.fit.paymentservice.models.Invoice;
import vn.edu.iuh.fit.paymentservice.models.PaymentStatus;
import vn.edu.iuh.fit.paymentservice.services.CoursePaymentService;
import vn.edu.iuh.fit.paymentservice.services.InvoiceService;

import java.util.List;

@Service
public class CheckoutMessageProducer {
    private final InvoiceService invoiceService;
    private final RabbitTemplate rabbitTemplate;

    public CheckoutMessageProducer(InvoiceService invoiceService, RabbitTemplate rabbitTemplate) {
        this.invoiceService = invoiceService;
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendCheckoutMessage(String studentId, String invoiceId, PaymentStatus status) {
        Invoice invoice = invoiceService.getInvoicesById(invoiceId);
        List<CheckoutClassRequest> checkoutClasses = invoice.getCoursePayments().stream().map(coursePayment -> new CheckoutClassRequest(coursePayment.getClassId(), coursePayment.getCourseName())).toList();
        rabbitTemplate.convertAndSend("checkout-fanout-exchange", "", new CheckoutMessage(studentId, checkoutClasses, status));
    }
}

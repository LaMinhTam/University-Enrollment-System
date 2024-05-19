package vn.edu.iuh.fit.notificationservice.message;

import jakarta.mail.MessagingException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.notificationservice.client.FacultyClient;
import vn.edu.iuh.fit.notificationservice.config.MailSenderConfig;
import vn.edu.iuh.fit.notificationservice.dtos.CheckoutClassRequest;
import vn.edu.iuh.fit.notificationservice.dtos.CheckoutMessage;
import vn.edu.iuh.fit.notificationservice.dtos.StudentDTO;
import vn.edu.iuh.fit.notificationservice.utils.MailSenderHelper;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CheckoutMessageConsumer {
    private final FacultyClient facultyClient;
    private final MailSenderConfig mailSenderConfig;

    public CheckoutMessageConsumer(FacultyClient facultyClient, MailSenderConfig mailSenderConfig) {
        this.facultyClient = facultyClient;
        this.mailSenderConfig = mailSenderConfig;
    }

    @RabbitListener(queues = "checkout-notification-queue")
    public void receiveCheckout(CheckoutMessage message) throws MessagingException, UnsupportedEncodingException {
        List<CheckoutClassRequest> classes = message.checkoutClassRequests();
        StudentDTO student = facultyClient.get(message.studentId());
        String classList = classes.stream()
                .map(CheckoutClassRequest::name)
                .collect(Collectors.joining(", "));
        String content = "Bạn đã thanh toán thành công các môn " + classList;
        MailSenderHelper.sendEmail(student.email(), "Thông báo thanh toán thành công", content, mailSenderConfig);
    }
}

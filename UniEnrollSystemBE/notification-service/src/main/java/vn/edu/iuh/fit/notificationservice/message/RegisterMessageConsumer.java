package vn.edu.iuh.fit.notificationservice.message;


import jakarta.mail.MessagingException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.notificationservice.client.FacultyClient;
import vn.edu.iuh.fit.notificationservice.config.MailSenderConfig;
import vn.edu.iuh.fit.notificationservice.dtos.*;
import vn.edu.iuh.fit.notificationservice.utils.MailSenderHelper;

import java.io.UnsupportedEncodingException;

@Service
public class RegisterMessageConsumer {
    private final FacultyClient facultyClient;
    private final MailSenderConfig mailSenderConfig;
    public RegisterMessageConsumer(FacultyClient facultyClient, MailSenderConfig mailSenderConfig) {
        this.facultyClient = facultyClient;
        this.mailSenderConfig = mailSenderConfig;
    }

    @RabbitListener(queues = "notification-queue")
    public void receivePaymentRegisterSchedule(MessageRequest request) throws MessagingException, UnsupportedEncodingException {
        switch (request.type()) {
            case REGISTER -> {
                RegisterRequest registerRequest = new RegisterRequest(
                        (String) request.request().get("studentId"),
                        (String) request.request().get("classId"),
                        (String) request.request().get("courseId"),
                        (String) request.request().get("courseName"),
                        (Double) request.request().get("amount"),
                        (int) request.request().get("credit"),
                        (int) request.request().get("theoryCredit"),
                        (int) request.request().get("practicalCredit")
                );
                StudentDTO studentDTO = facultyClient.get(registerRequest.studentId());
                MailSenderHelper.sendEmail(studentDTO.email(), "Thông báo đăng ký học phần", "Bạn đã đăng ký thành công học phần " + registerRequest.classId() + "-" + registerRequest.courseName() + "(" + registerRequest.credit() + " ," + registerRequest.theoryCredit() + ", " + registerRequest.practicalCredit() + ")", mailSenderConfig);
            }
            case CANCEL -> {
                CancelRequest cancelRequest = new CancelRequest(
                        (String) request.request().get("studentId"),
                        (String) request.request().get("classId"),
                        (int) request.request().get("group")
                );
                StudentDTO studentDTO = facultyClient.get(cancelRequest.studentId());
                MailSenderHelper.sendEmail(studentDTO.email(), "Thông báo hủy đăng ký học phần", "Bạn đã hủy đăng ký học phần " + cancelRequest.classId(), mailSenderConfig);
            }
            case CHANGE -> {
                ChangeRegisterRequest changeRegisterRequest = new ChangeRegisterRequest(
                        (String) request.request().get("studentId"),
                        (String) request.request().get("oldClassId"),
                        (String) request.request().get("newClassId")
                );
                StudentDTO studentDTO = facultyClient.get(changeRegisterRequest.studentId());
                MailSenderHelper.sendEmail(studentDTO.email(), "Thông báo thay đổi đăng ký học phần", "Bạn đã thay đổi đăng ký học phần từ " + changeRegisterRequest.oldClassId() + " sang " + changeRegisterRequest.newClassId(), mailSenderConfig);
            }
        }
    }
}
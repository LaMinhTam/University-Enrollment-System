package vn.edu.iuh.fit.paymentservice.message;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.paymentservice.dtos.ChangeRegisterRequest;
import vn.edu.iuh.fit.paymentservice.dtos.RegisterRequest;
import vn.edu.iuh.fit.paymentservice.services.CoursePaymentService;

@Service
public class RegisterMessageConsumer {
    private final CoursePaymentService coursePaymentService;

    public RegisterMessageConsumer(CoursePaymentService coursePaymentService) {
        this.coursePaymentService = coursePaymentService;
    }


    @RabbitListener(queues = "payment-enroll-queue")
    public void receivePaymentRegisterSchedule(RegisterRequest request) {
        coursePaymentService.register(request);
    }

    @RabbitListener(queues = "payment-cancel-queue")
    public void receivePaymentCancelSchedule(RegisterRequest request) {
        coursePaymentService.cancelRegister(request.studentId(), request.classId());
    }

    @RabbitListener(queues = "payment-change-queue")
    public void receivePaymentChangeSchedule(ChangeRegisterRequest request) {
        coursePaymentService.changeSchedule(request.studentId(), request.newClassId(), request.oldClassId());
    }
}
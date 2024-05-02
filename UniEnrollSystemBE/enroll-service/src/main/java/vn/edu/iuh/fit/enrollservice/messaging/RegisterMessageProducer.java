package vn.edu.iuh.fit.enrollservice.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.enrollservice.dtos.ChangeScheduleRequest;
import vn.edu.iuh.fit.enrollservice.dtos.RegisterSchedule;

@Service
public class RegisterMessageProducer {
    private final RabbitTemplate rabbitTemplate;

    public RegisterMessageProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendRegisterSchedule(RegisterSchedule schedule) {
        rabbitTemplate.convertAndSend("enroll-queue", schedule);
    }

    public void sendCancelSchedule(RegisterSchedule schedule) {
        rabbitTemplate.convertAndSend("cancel-queue", schedule);
    }

    public void sendChangeSchedule(ChangeScheduleRequest schedule) {
        rabbitTemplate.convertAndSend("change-queue", schedule);
    }
}

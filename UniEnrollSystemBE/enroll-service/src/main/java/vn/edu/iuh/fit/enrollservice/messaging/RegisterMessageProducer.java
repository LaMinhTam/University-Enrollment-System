package vn.edu.iuh.fit.enrollservice.messaging;

import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.enrollservice.dtos.CancelRequest;
import vn.edu.iuh.fit.enrollservice.dtos.ChangeRegisterRequest;
import vn.edu.iuh.fit.enrollservice.dtos.RegisterRequest;

@Service
public class RegisterMessageProducer {
    private final RabbitTemplate rabbitTemplate;
    @Autowired
    public RegisterMessageProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendRegisterSchedule(RegisterRequest request) {
        rabbitTemplate.convertAndSend("enroll-fanout-exchange", "", request);
    }

    public void sendCancelSchedule(CancelRequest request) {
        rabbitTemplate.convertAndSend("cancel-fanout-exchange", "", request);
    }

    public void sendChangeSchedule(ChangeRegisterRequest request) {
        rabbitTemplate.convertAndSend("change-fanout-exchange", "", request);
    }
}

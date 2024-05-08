package vn.edu.iuh.fit.enrollservice.messaging;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfiguration {
    @Bean
    public Declarables fanoutBindings() {
        FanoutExchange enrollExchange = new FanoutExchange("enroll-fanout-exchange");
        FanoutExchange cancelExchange = new FanoutExchange("cancel-fanout-exchange");
        FanoutExchange changeExchange = new FanoutExchange("change-fanout-exchange");

        Queue enrollScheduleQueue = new Queue("schedule-enroll-queue");
        Queue enrollPaymentQueue = new Queue("payment-enroll-queue");
        Queue cancelScheduleQueue = new Queue("schedule-cancel-queue");
        Queue cancelPaymentQueue = new Queue("payment-cancel-queue");
        Queue changeScheduleQueue = new Queue("schedule-change-queue");
        Queue changePaymentQueue = new Queue("payment-change-queue");

        return new Declarables(
                enrollScheduleQueue,
                enrollPaymentQueue,
                cancelScheduleQueue,
                cancelPaymentQueue,
                changeScheduleQueue,
                changePaymentQueue,
                enrollExchange,
                cancelExchange,
                changeExchange,
                BindingBuilder.bind(enrollScheduleQueue).to(enrollExchange),
                BindingBuilder.bind(enrollPaymentQueue).to(enrollExchange),
                BindingBuilder.bind(cancelScheduleQueue).to(cancelExchange),
                BindingBuilder.bind(cancelPaymentQueue).to(cancelExchange),
                BindingBuilder.bind(changeScheduleQueue).to(changeExchange),
                BindingBuilder.bind(changePaymentQueue).to(changeExchange)
        );
    }


    @Bean
    public RabbitTemplate rabbitTemplate(final ConnectionFactory connectionFactory) {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(producerJackson2MessageConverter());
        return rabbitTemplate;
    }

    @Bean
    public Jackson2JsonMessageConverter producerJackson2MessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}

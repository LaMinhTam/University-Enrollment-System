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
        FanoutExchange enrollExchange = new FanoutExchange("fanout-exchange");

        Queue enrollScheduleQueue = new Queue("schedule-queue");
        Queue enrollPaymentQueue = new Queue("payment-queue");
        Queue checkoutQueue = new Queue("checkout-queue");
        return new Declarables(
                enrollScheduleQueue,
                enrollPaymentQueue,
                checkoutQueue,
                enrollExchange,
                BindingBuilder.bind(enrollScheduleQueue).to(enrollExchange),
                BindingBuilder.bind(enrollPaymentQueue).to(enrollExchange)
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

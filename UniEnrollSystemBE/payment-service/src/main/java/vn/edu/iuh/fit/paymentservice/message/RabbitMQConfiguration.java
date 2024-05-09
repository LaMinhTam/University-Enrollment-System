package vn.edu.iuh.fit.paymentservice.message;

import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Declarables;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfiguration {
    @Bean
    public Declarables fanoutBindings() {
        FanoutExchange checkoutExchange = new FanoutExchange("checkout-fanout-exchange");

        Queue checkoutQueue = new Queue("checkout-queue");
        Queue enrollScheduleQueue = new Queue("payment-enroll-queue");
        Queue cancelPaymentQueue = new Queue("payment-cancel-queue");
        Queue changeScheduleQueue = new Queue("payment-change-queue");

        return new Declarables(
                checkoutQueue,
                enrollScheduleQueue,
                cancelPaymentQueue,
                changeScheduleQueue,
                checkoutExchange,
                BindingBuilder.bind(checkoutQueue).to(checkoutExchange)
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

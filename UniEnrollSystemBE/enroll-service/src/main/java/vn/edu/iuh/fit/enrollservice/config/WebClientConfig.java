package vn.edu.iuh.fit.enrollservice.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.reactive.LoadBalancedExchangeFilterFunction;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;
import vn.edu.iuh.fit.enrollservice.client.CourseClient;
import vn.edu.iuh.fit.enrollservice.client.PaymentClient;
import vn.edu.iuh.fit.enrollservice.client.ScheduleClient;

@Configuration
public class WebClientConfig {
    private final LoadBalancedExchangeFilterFunction filterFunction;

    public WebClientConfig(LoadBalancedExchangeFilterFunction filterFunction) {
        this.filterFunction = filterFunction;
    }


    @Bean
    public WebClient scheduleWebClient() {
        return WebClient.builder()
                .baseUrl("http://schedule-service")
                .filter(filterFunction)
                .build();
    }

    @Bean
    public WebClient courseWebClient() {
        return WebClient.builder()
                .baseUrl("http://course-service")
                .filter(filterFunction)
                .build();
    }

    @Bean
    public WebClient paymentWebClient() {
        return WebClient.builder()
                .baseUrl("http://payment-service")
                .filter(filterFunction)
                .build();
    }
}
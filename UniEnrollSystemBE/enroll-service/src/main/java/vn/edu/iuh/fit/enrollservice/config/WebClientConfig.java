package vn.edu.iuh.fit.enrollservice.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.reactive.LoadBalancedExchangeFilterFunction;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;
import vn.edu.iuh.fit.enrollservice.client.CourseClient;
import vn.edu.iuh.fit.enrollservice.client.ScheduleClient;

@Configuration
public class WebClientConfig {

    @Autowired
    private LoadBalancedExchangeFilterFunction filterFunction;


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
    public ScheduleClient scheduleClient() {
        HttpServiceProxyFactory httpServiceProxyFactory
                = HttpServiceProxyFactory
                .builder(WebClientAdapter.forClient(scheduleWebClient()))
                .build();
        return httpServiceProxyFactory.createClient(ScheduleClient.class);
    }

    @Bean
    public CourseClient courseClient() {
        HttpServiceProxyFactory httpServiceProxyFactory
                = HttpServiceProxyFactory
                .builder(WebClientAdapter.forClient(courseWebClient()))
                .build();
        return httpServiceProxyFactory.createClient(CourseClient.class);
    }
}
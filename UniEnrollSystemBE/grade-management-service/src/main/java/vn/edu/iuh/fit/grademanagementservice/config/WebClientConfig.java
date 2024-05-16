package vn.edu.iuh.fit.grademanagementservice.config;

import org.springframework.cloud.client.loadbalancer.reactive.LoadBalancedExchangeFilterFunction;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    private final LoadBalancedExchangeFilterFunction filterFunction;

    public WebClientConfig(LoadBalancedExchangeFilterFunction filterFunction) {
        this.filterFunction = filterFunction;
    }


    @Bean
    public WebClient facultyWebClient() {
        return WebClient.builder()
                .baseUrl("http://faculty-service")
                .filter(filterFunction)
                .build();
    }
}
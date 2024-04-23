package vn.edu.iuh.fit.authservice.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.reactive.LoadBalancedExchangeFilterFunction;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;
import vn.edu.iuh.fit.authservice.client.FacultyClient;

@Configuration
public class WebClientConfig {

    @Autowired
    private LoadBalancedExchangeFilterFunction filterFunction;


    @Bean
    public WebClient facultyWebClient() {
        return WebClient.builder()
                .baseUrl("http://faculty-service")
                .filter(filterFunction)
                .build();
    }

    @Bean
    public FacultyClient facultyClient() {
        HttpServiceProxyFactory httpServiceProxyFactory
                = HttpServiceProxyFactory
                .builder(WebClientAdapter.forClient(facultyWebClient()))
                .build();
        return httpServiceProxyFactory.createClient(FacultyClient.class);
    }
}
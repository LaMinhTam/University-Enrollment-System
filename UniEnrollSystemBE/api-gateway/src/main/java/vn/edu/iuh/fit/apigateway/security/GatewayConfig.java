package vn.edu.iuh.fit.apigateway.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Autowired
    AuthenticationFilter filter;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("student-service", r -> r.path("/student/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://student-service"))

                .route("auth-service", r -> r.path("/auth/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://auth-service"))

                .route("faculty-service", r -> r.path("/students/**", "/faculties/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://faculty-service"))

                .route("enroll-service", r -> r.path("/enrollments/**", "/classes/**", "/wait-list/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://enroll-service"))

                .route("course-service", r -> r.path("/courses/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://course-service"))

                .route("schedule-service", r -> r.path("/schedules/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://schedule-service"))

                .route("grade-management-service", r -> r.path("/grade-report/**", "/semester-report/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://grade-management-service"))

                .route("payment-service", r -> r.path("/payments/**", "/invoices/**", "/course-payments/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://payment-service"))
                .build();
    }

}


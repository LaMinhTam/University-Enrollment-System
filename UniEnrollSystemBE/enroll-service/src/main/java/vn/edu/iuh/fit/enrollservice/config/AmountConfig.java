package vn.edu.iuh.fit.enrollservice.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@Getter
public class AmountConfig {
    @Value("${prices}")
    private List<String> prices;
}

package vn.edu.iuh.fit.notificationservice.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Configuration
public class MailSenderConfig {
    @Value("${spring.mail.host}")
    public String host;
    @Value("${spring.mail.port}")
    public int port;
    @Value("${spring.mail.username}")
    public String username;
    @Value("${spring.mail.password}")
    public String password;
    @Value("${spring.mail.properties.mail.smtp.auth}")
    public String smtpAuth;
    @Value("${spring.mail.properties.mail.smtp.starttls.enable}")
    public String smtpSecured;
    @Value("${spring.mail.sender}")
    public String sender;
}

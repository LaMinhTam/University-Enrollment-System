package vn.edu.iuh.fit.notificationservice.utils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.notificationservice.config.MailSenderConfig;

import java.io.UnsupportedEncodingException;
import java.util.Properties;

public class MailSenderHelper {
    public static String getSiteUrl(HttpServletRequest request) {
        String site = request.getRequestURL().toString();
        return site.replace(request.getServletPath(), "");
    }

    public static void sendEmail(String toAddress, String subject, String content, MailSenderConfig mailSenderConfig) throws MessagingException, UnsupportedEncodingException {
        JavaMailSenderImpl javaMailSender = prepareMailSender(mailSenderConfig);

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, "UTF-8");

        mimeMessageHelper.setFrom(mailSenderConfig.getUsername(), mailSenderConfig.getSender());
        mimeMessageHelper.setTo(toAddress);
        mimeMessageHelper.setSubject(subject);
        mimeMessageHelper.setText("<p>" + content + "</p>", true);

        javaMailSender.send(message);
    }

    public static JavaMailSenderImpl prepareMailSender(MailSenderConfig mailSenderConfig) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(mailSenderConfig.getHost());
        mailSender.setPort(mailSenderConfig.getPort());
        mailSender.setUsername(mailSenderConfig.getUsername());
        mailSender.setPassword(mailSenderConfig.getPassword());

        Properties properties = new Properties();
        properties.setProperty("mail.smtp.auth", mailSenderConfig.getSmtpAuth());
        properties.setProperty("mail.smtp.starttls.enable", mailSenderConfig.getSmtpSecured());
        mailSender.setJavaMailProperties(properties);

        return mailSender;
    }
}

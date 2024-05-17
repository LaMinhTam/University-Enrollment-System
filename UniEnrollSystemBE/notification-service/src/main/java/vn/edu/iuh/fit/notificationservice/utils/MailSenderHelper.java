package com.tektrove.tektrovecustomer.utils;

import com.tektrovecommon.entity.setting.SettingBag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

public class MailSenderHelper {
    public static String getSiteUrl(HttpServletRequest request) {
        String site = request.getRequestURL().toString();
        return site.replace(request.getServletPath(), "");
    }

    public static JavaMailSenderImpl prepareMailSender(SettingBag emailSettings) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(emailSettings.getValue("MAIL_HOST"));
        mailSender.setPort(Integer.parseInt(emailSettings.getValue("MAIL_PORT")));
        mailSender.setUsername(emailSettings.getValue("MAIL_USERNAME"));
        mailSender.setPassword(emailSettings.getValue("MAIL_PASSWORD"));

        Properties properties = new Properties();
        properties.setProperty("mail.smtp.auth", emailSettings.getValue("SMTP_AUTH"));
        properties.setProperty("mail.smtp.starttls.enable", emailSettings.getValue("SMTP_SECURED"));
        mailSender.setJavaMailProperties(properties);


        return mailSender;
    }
}

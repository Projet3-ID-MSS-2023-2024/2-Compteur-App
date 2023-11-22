package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.model.MailStructure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String mailFrom;

    public void sendMail(String mail, MailStructure mailStructure) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mailFrom);
        message.setSubject(mailStructure.getObject());
        message.setText(mailStructure.getMessage());
        message.setTo(mail);

        mailSender.send(message);
    }
}

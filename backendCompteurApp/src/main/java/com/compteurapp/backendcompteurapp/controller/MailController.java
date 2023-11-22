package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.model.MailStructure;
import com.compteurapp.backendcompteurapp.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MailController {

    @Autowired
    private MailService mailService;

    @RequestMapping("/sendMail/{email}")
    public String sendMail(@PathVariable String email, @RequestBody MailStructure mailStructure){
        mailService.sendMail(email, mailStructure);
        return "Mail sent successfully";

    }

}

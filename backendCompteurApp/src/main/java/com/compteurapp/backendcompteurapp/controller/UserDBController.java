package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.services.UserDBService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserDBController {

    @Autowired
    private final UserDBService userDBService;

    @RequestMapping("/syncUser")
    public String syncUser(com.compteurapp.backendcompteurapp.model.UserDB user) {
        userDBService.jwtAuthUserFilterBean();
        return "User synced successfully";
    }

    @RequestMapping("/userDB/{id}")
    public UserDB getUser(@PathVariable String id) {
        return userDBService.getUserById(id);
    }

}

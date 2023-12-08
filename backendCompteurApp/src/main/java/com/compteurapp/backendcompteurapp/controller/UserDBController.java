package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.services.UserDBService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserDBController {

    @Autowired
    private final UserDBService userDBService;

    @RequestMapping("/syncUser")
    public String syncUser() {
        userDBService.doFilterInternal();
        return "User synced successfully";
    }

    @GetMapping("/userDB/{id}")
    public UserDB getUser(@PathVariable String id) {
        return userDBService.getUserById(id);
    }

    @GetMapping("/listProviders")
    public List<UserDB> getProviders() {
        return userDBService.getProviders();
    }

    @GetMapping("/getUserByName/{username}")
    public UserDB getUserByName(@PathVariable String username) {
        return userDBService.getUserByName(username);
    }

    @GetMapping("/listProvidersByCategory/{id}")
    public List<UserDB> getProvidersByCategory(@PathVariable Long id) {
        return userDBService.getProvidersByCategory(id);
    }

    @GetMapping("/hasAddressAndMeter/{id}")
    public boolean hasAddressAndMeter(@PathVariable String username){
        return userDBService.hasAddressAndMeter(username);
    }

}

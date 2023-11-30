package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.services.SyncService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class SyncController {

    @Autowired
    private final SyncService syncService;

    @RequestMapping("/syncUser")
    public String syncUser(UserDB user) {
        syncService.jwtAuthUserFilterBean();
        return "User synced successfully";
    }


}

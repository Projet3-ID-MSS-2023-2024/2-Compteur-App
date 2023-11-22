package com.compteurapp.backendcompteurapp.controller;

import java.util.*;
import com.compteurapp.backendcompteurapp.dto.Provider;
import com.compteurapp.backendcompteurapp.dto.User;
import com.compteurapp.backendcompteurapp.services.KeycloakService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.ws.rs.core.Response;


@RestController
@RequestMapping("/api")
public class KeycloakController {

    final KeycloakService keycloakService;

    public KeycloakController(KeycloakService keycloakService) {
        this.keycloakService = keycloakService;
    }

    //------------------User------------------//
    @PutMapping("/user/{id}")
    public Response updateUser(@PathVariable String id, @RequestBody User user) {
        return this.keycloakService.updateUser(id, user);
    }

    @DeleteMapping("/user/{id}")
    public Response deleteUser(@PathVariable String id) {
        return this.keycloakService.deleteUser(id);
    }

    //------------------Provider------------------//
    @GetMapping("/provider")
    public List<Provider> getProviders() {
        return this.keycloakService.getProviders();
    }

    @PreAuthorize("hasRole('admin')")
    @PostMapping("/provider")
    public Response createProvider(@RequestBody Provider provider) {
        return this.keycloakService.createProvider(provider);
    }

    @PreAuthorize("hasRole('admin')")
    @PutMapping("/provider/{id}")
    public Response updateProvider(@PathVariable String id, @RequestBody Provider provider) {
        return this.keycloakService.updateProvider(id, provider);
    }
    @PreAuthorize("hasRole('admin')")
    @DeleteMapping("/provider/{id}")
    public Response deleteProvider(@PathVariable String id) {
        return this.keycloakService.deleteProvider(id);
    }

}

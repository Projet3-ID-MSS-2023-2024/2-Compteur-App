package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.DTO.ProviderDTO;
import com.compteurapp.backendcompteurapp.DTO.UserDTO;
import com.compteurapp.backendcompteurapp.services.KeycloakService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.ws.rs.core.Response;


@RestController
@RequestMapping("/api")
public class KeycloakController {

    @Autowired
    private KeycloakService keycloakService;

    //------------------User------------------//

    @PutMapping("/user/{id}")
    public Response updateUser(@PathVariable String id, @RequestBody UserDTO userDTO) {
        return this.keycloakService.updateUser(id, userDTO);
    }

    @DeleteMapping("/user/{id}")
    public Response deleteUser(@PathVariable String id) {
        return this.keycloakService.deleteUser(id);
    }

    //------------------Provider------------------//

    @PreAuthorize("hasRole('admin')")
    @PostMapping("/provider")
    public Response createProvider(@RequestBody ProviderDTO providerDTO) {
        return this.keycloakService.createProvider(providerDTO);
    }

    @PreAuthorize("hasRole('admin')")
    @PutMapping("/provider/{id}")
    public Response updateProvider(@PathVariable String id, @RequestBody ProviderDTO providerDTO) {
        return this.keycloakService.updateProvider(id, providerDTO);
    }
    @PreAuthorize("hasRole('admin')")
    @DeleteMapping("/provider/{id}")
    public Response deleteProvider(@PathVariable String id) {
        return this.keycloakService.deleteProvider(id);
    }

}

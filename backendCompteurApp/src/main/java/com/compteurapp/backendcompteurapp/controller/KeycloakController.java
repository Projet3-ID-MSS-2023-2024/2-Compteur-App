package com.compteurapp.backendcompteurapp.controller;

import java.util.*;
import java.util.stream.Collectors;

import com.compteurapp.backendcompteurapp.dto.Provider;
import com.compteurapp.backendcompteurapp.dto.User;
import com.compteurapp.backendcompteurapp.security.KeycloakSecurityUtil;
import com.compteurapp.backendcompteurapp.services.KeycloakService;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.ws.rs.core.Response;


@RestController
@RequestMapping("/api")
public class KeycloakController {

    final KeycloakSecurityUtil keycloakUtil;

    @Value("${realm}")
    private String realm;

    @Autowired
    KeycloakService keycloakService;

    public KeycloakController(KeycloakSecurityUtil keycloakUtil) {
        this.keycloakUtil = keycloakUtil;
    }

    //------------------User------------------//
    @GetMapping("/users")
    public List<User> getUsers() {
        return this.keycloakService.getUsers();
    }

    @PostMapping("/user")
    public Response createUser(@RequestBody User user) {
        return this.keycloakService.createUser(user);
    }

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
        UserRepresentation userRep = mapUserRep(provider);
        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("tva", Collections.singletonList(provider.getTva()));
        attributes.put("phoneNumber", Collections.singletonList(provider.getPhoneNumber()));
        userRep.setAttributes(attributes);

        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        keycloak.realm(realm).users().get(id).update(userRep);
        return Response.ok(provider).build();
    }
    @PreAuthorize("hasRole('admin')")
    @DeleteMapping("/provider/{id}")
    public Response deleteProvider(@PathVariable String id) {
        return this.keycloakService.deleteUser(id);
    }

    //------------------Role------------------//
    @PostMapping("/asignRole/{userId}/{roleName}")
    public Response asignRole(@PathVariable String userId, @PathVariable String roleName) {
        return this.keycloakService.asignRole(userId, roleName);
    }

    //------------------Private------------------//
    private User mapUser(UserRepresentation userRep) {
        User user = new User();
        user.setFirstName(userRep.getFirstName());
        user.setLastName(userRep.getLastName());
        user.setEmail(userRep.getEmail());
        user.setUserName(userRep.getUsername());
        return user;
    }

    private UserRepresentation mapUserRep(User user) {
        UserRepresentation userRep = new UserRepresentation();
        userRep.setUsername(user.getUserName());
        userRep.setFirstName(user.getFirstName());
        userRep.setLastName(user.getLastName());
        userRep.setEmail(user.getEmail());
        userRep.setEnabled(true);
        userRep.setEmailVerified(true);
        CredentialRepresentation cred = new CredentialRepresentation();
        cred.setTemporary(false);
        cred.setValue(user.getPassword());
        userRep.setCredentials(Collections.singletonList(cred));
        return userRep;
    }
}

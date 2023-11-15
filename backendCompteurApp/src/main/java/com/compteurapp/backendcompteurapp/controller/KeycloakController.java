package com.compteurapp.backendcompteurapp.controller;

import java.util.*;
import java.util.stream.Collectors;

import com.compteurapp.backendcompteurapp.dto.Provider;
import com.compteurapp.backendcompteurapp.dto.User;
import com.compteurapp.backendcompteurapp.security.KeycloakSecurityUtil;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.ws.rs.core.Response;


@RestController
@RequestMapping("/api")
public class KeycloakController {

    final KeycloakSecurityUtil keycloakUtil;

    @Value("${realm}")
    private String realm;

    public KeycloakController(KeycloakSecurityUtil keycloakUtil) {
        this.keycloakUtil = keycloakUtil;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        List<UserRepresentation> userRepresentations = keycloak.realm(realm).users().list();
        return userRepresentations.stream().map(this::mapUser).collect(Collectors.toList());
    }

    @PostMapping("/user")
    public Response createUser(@RequestBody User user) {
        UserRepresentation userRep = mapUserRep(user);
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        keycloak.realm(realm).users().create(userRep);
        return Response.ok(user).build();
    }

    @GetMapping("/providers")
    public List<Provider> getProviders() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        List<UserRepresentation> userRepresentations = keycloak.realm(realm).users().list();
        List<Provider> providers = new ArrayList<>();
        for (UserRepresentation userRepresentation : userRepresentations) {
            if (userRepresentation.getAttributes() != null && userRepresentation.getAttributes().containsKey("tva")) {
                Provider provider = new Provider();
                provider.setUserName(userRepresentation.getUsername());
                provider.setFirstName(userRepresentation.getFirstName());
                provider.setLastName(userRepresentation.getLastName());
                provider.setEmail(userRepresentation.getEmail());
                provider.setTva(userRepresentation.getAttributes().get("tva").get(0));
                provider.setPhoneNumber(userRepresentation.getAttributes().get("phoneNumber").get(0));
                providers.add(provider);
            }
        }
        return providers;
    }

    @PostMapping("/provider")
    public Response createProvider(@RequestBody Provider provider) {
        UserRepresentation userRep = mapUserRep(provider);
        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("tva", Collections.singletonList(provider.getTva()));
        attributes.put("phoneNumber", Collections.singletonList(provider.getPhoneNumber()));
        userRep.setAttributes(attributes);

        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        Response createUserResponse = keycloak.realm(realm).users().create(userRep);
        String userId;
        if (createUserResponse.getStatus() == 201)
        {
            userId = CreatedResponseUtil.getCreatedId(createUserResponse);
            RoleRepresentation providerRole = keycloak.realm(realm).roles().get("fournisseur").toRepresentation();
            keycloak.realm(realm).users().get(userId).roles().realmLevel().add(Collections.singletonList(providerRole));
        }
        return Response.ok(provider).build();
    }

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

package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.dto.Provider;
import com.compteurapp.backendcompteurapp.dto.User;
import com.compteurapp.backendcompteurapp.security.KeycloakSecurityUtil;
import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class KeycloakService {
    final KeycloakSecurityUtil keycloakUtil;

    @Value("${realm}")
    private String realm;
    public KeycloakService(KeycloakSecurityUtil keycloakUtil) {
        this.keycloakUtil = keycloakUtil;
    }

    public Response deleteUser(@PathVariable String id) {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        keycloak.realm(realm).users().delete(id);
        return Response.ok().build();
    }

    public Response updateUser(@PathVariable String id, @RequestBody User user) {
        UserRepresentation userRep = mapUserRep(user);
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        keycloak.realm(realm).users().get(id).update(userRep);
        return Response.ok(user).build();
    }

    public List<Provider> getProviders() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        List<UserRepresentation> userRepresentations = keycloak.realm(realm).users().list();
        List<Provider> providers = new ArrayList<>();
        for (UserRepresentation userRepresentation : userRepresentations) {
            if (userRepresentation.getAttributes() != null && userRepresentation.getAttributes().containsKey("tva")) {
                Provider provider = new Provider();
                provider.setId(userRepresentation.getId());
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

    public Response deleteProvider(@PathVariable String id) {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        keycloak.realm(realm).users().delete(id);
        return Response.ok().build();
    }

    private User mapUser(UserRepresentation userRep) {
        User user = new User();
        user.setId(userRep.getId());
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

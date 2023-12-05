package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.model.Category;
import com.compteurapp.backendcompteurapp.model.Provider;
import com.compteurapp.backendcompteurapp.model.User;
import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.repository.UserDBRepository;
import com.compteurapp.backendcompteurapp.security.KeycloakSecurityUtil;
import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;

@Service
public class KeycloakService {
    final KeycloakSecurityUtil keycloakUtil;

    @Autowired
    public UserDBRepository userDBRepository;

    @Value("${realm}")
    private String realm;
    public KeycloakService(KeycloakSecurityUtil keycloakUtil) {
        this.keycloakUtil = keycloakUtil;
    }

    public Response deleteUser(String id) {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        keycloak.realm(realm).users().delete(id);
        this.userDBRepository.deleteById(id);
        return Response.ok().build();
    }

    public Response updateUser(String id, User user) {
        UserRepresentation userRep = mapUserRep(user);
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        keycloak.realm(realm).users().get(id).update(userRep);

        this.userDBRepository.findById(id).ifPresent(userDB -> {
            userDB.setFirstname(user.getFirstName());
            userDB.setLastname(user.getLastName());
            userDB.setEmail(user.getEmail());
            userDB.setUsername(user.getUserName());
            this.userDBRepository.save(userDB);
        });

        return Response.ok(user).build();
    }



    public Response createProvider(Provider provider) {
        UserRepresentation userRep = mapUserRep(provider);
        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("tva", Collections.singletonList(provider.getTva()));
        attributes.put("phoneNumber", Collections.singletonList(provider.getPhoneNumber()));
        attributes.put("idCategory", Collections.singletonList(provider.getIdCategory()));
        userRep.setAttributes(attributes);
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        Response createUserResponse = keycloak.realm(realm).users().create(userRep);
        String userId;
        if (createUserResponse.getStatus() == 201)
        {
            userId = CreatedResponseUtil.getCreatedId(createUserResponse);
            RoleRepresentation providerRole = keycloak.realm(realm).roles().get("fournisseur").toRepresentation();
            keycloak.realm(realm).users().get(userId).roles().realmLevel().add(Collections.singletonList(providerRole));

            UserDB userDB = new UserDB();
            userDB.setId(userId);
            userDB.setFirstname(provider.getFirstName());
            userDB.setLastname(provider.getLastName());
            userDB.setEmail(provider.getEmail());
            userDB.setUsername(provider.getUserName());
            userDB.setTva(provider.getTva());
            userDB.setPhoneNumber(provider.getPhoneNumber());

            Category category = new Category();
            category.setId(Long.parseLong(provider.getIdCategory()));
            userDB.setCategory(category);
            userDB.setRole("fournisseur");
            this.userDBRepository.save(userDB);
        }
        return Response.ok(provider).build();
    }

    public Response updateProvider(String id, Provider provider) {
        UserRepresentation userRep = mapUserRep(provider);
        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("tva", Collections.singletonList(provider.getTva()));
        attributes.put("phoneNumber", Collections.singletonList(provider.getPhoneNumber()));
        attributes.put("idCategory", Collections.singletonList(provider.getIdCategory()));
        userRep.setAttributes(attributes);
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        keycloak.realm(realm).users().get(id).update(userRep);
        this.userDBRepository.findById(id).ifPresent(userDB -> {
            userDB.setFirstname(provider.getFirstName());
            userDB.setLastname(provider.getLastName());
            userDB.setEmail(provider.getEmail());
            userDB.setUsername(provider.getUserName());
            userDB.setTva(provider.getTva());
            userDB.setPhoneNumber(provider.getPhoneNumber());
            Category category = new Category();
            category.setId(Long.parseLong(provider.getIdCategory()));
            userDB.setCategory(category);
            this.userDBRepository.save(userDB);
        });

        return Response.ok(provider).build();
    }


    public Response deleteProvider(@PathVariable String id) {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        keycloak.realm(realm).users().delete(id);
        try {
            this.userDBRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ex) {
            // Gérer l'exception ici
        }
        return Response.ok().build();
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

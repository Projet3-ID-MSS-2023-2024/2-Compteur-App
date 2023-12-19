package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.model.Category;
import com.compteurapp.backendcompteurapp.DTO.ProviderDTO;
import com.compteurapp.backendcompteurapp.DTO.UserDTO;
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

import java.util.*;

@Service
public class KeycloakService {
    final KeycloakSecurityUtil keycloakUtil;

    @Autowired
    public UserDBRepository userDBRepository;

    @Autowired
    public PhotoService photoService;

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

    public Response updateUser(String id, UserDTO userDTO) {
        UserRepresentation userRep = mapUserRep(userDTO);
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        keycloak.realm(realm).users().get(id).update(userRep);

        this.userDBRepository.findById(id).ifPresent(userDB -> {
            userDB.setFirstname(userDTO.getFirstName());
            userDB.setLastname(userDTO.getLastName());
            userDB.setEmail(userDTO.getEmail());
            userDB.setUsername(userDTO.getUserName());
            userDB.setPhoneNumber(userDTO.getPhoneNumber());
            this.userDBRepository.save(userDB);
        });

        return Response.ok(userDTO).build();
    }



    public Response createProvider(ProviderDTO providerDTO) {
        UserRepresentation userRep = mapUserRep(providerDTO);
        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("tva", Collections.singletonList(providerDTO.getTva()));
        attributes.put("phoneNumber", Collections.singletonList(providerDTO.getPhoneNumber()));
        attributes.put("idCategory", Collections.singletonList(providerDTO.getIdCategory()));
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
            userDB.setFirstname(providerDTO.getFirstName());
            userDB.setLastname(providerDTO.getLastName());
            userDB.setEmail(providerDTO.getEmail());
            userDB.setUsername(providerDTO.getUserName());
            userDB.setTva(providerDTO.getTva());
            userDB.setPhoneNumber(providerDTO.getPhoneNumber());

            Category category = new Category();
            category.setId(Long.parseLong(providerDTO.getIdCategory()));
            userDB.setCategory(category);
            userDB.setRole("fournisseur");
            this.userDBRepository.save(userDB);
        }
        return Response.ok(providerDTO).build();
    }

    public Response updateProvider(String id, ProviderDTO providerDTO) {
        UserRepresentation userRep = mapUserRep(providerDTO);
        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("tva", Collections.singletonList(providerDTO.getTva()));
        attributes.put("phoneNumber", Collections.singletonList(providerDTO.getPhoneNumber()));
        attributes.put("idCategory", Collections.singletonList(providerDTO.getIdCategory()));
        userRep.setAttributes(attributes);
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        keycloak.realm(realm).users().get(id).update(userRep);
        this.userDBRepository.findById(id).ifPresent(userDB -> {
            userDB.setFirstname(providerDTO.getFirstName());
            userDB.setLastname(providerDTO.getLastName());
            userDB.setEmail(providerDTO.getEmail());
            userDB.setUsername(providerDTO.getUserName());
            userDB.setTva(providerDTO.getTva());
            userDB.setPhoneNumber(providerDTO.getPhoneNumber());
            Category category = new Category();
            category.setId(Long.parseLong(providerDTO.getIdCategory()));
            userDB.setCategory(category);
            this.userDBRepository.save(userDB);
        });

        return Response.ok(providerDTO).build();
    }


    public Response deleteProvider(@PathVariable String id) {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        keycloak.realm(realm).users().delete(id);
        try {
            this.photoService.deletePhotoByIdUser(id);
            this.userDBRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ex) {
            // Gérer l'exception ici
        }
        return Response.ok().build();
    }

    private UserRepresentation mapUserRep(UserDTO userDTO) {
        UserRepresentation userRep = new UserRepresentation();
        userRep.setUsername(userDTO.getUserName());
        userRep.setFirstName(userDTO.getFirstName());
        userRep.setLastName(userDTO.getLastName());
        userRep.setEmail(userDTO.getEmail());
        userRep.setEnabled(true);
        userRep.setEmailVerified(true);
        CredentialRepresentation cred = new CredentialRepresentation();
        cred.setTemporary(false);
        cred.setValue(userDTO.getPassword());
        userRep.setCredentials(Collections.singletonList(cred));
        return userRep;
    }
}

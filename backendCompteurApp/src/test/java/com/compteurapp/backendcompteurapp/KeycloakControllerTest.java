package com.compteurapp.backendcompteurapp;

import com.compteurapp.backendcompteurapp.model.Provider;
import com.compteurapp.backendcompteurapp.model.User;
import com.compteurapp.backendcompteurapp.security.KeycloakSecurityUtilTest;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class KeycloakControllerTest{

@Autowired
KeycloakSecurityUtilTest keycloakUtil;


    @Value("compteurapptest")
    private String realm;

    @Test
    @Order(0)
    public void init() {
        List<User> users;
        User user1 = new User();
        user1.setFirstName("test1");
        user1.setLastName("test1");
        user1.setEmail("test1@gmail.com");
        user1.setUserName("test1");
        user1.setPassword("test1");
        User user2 = new User();
        user2.setFirstName("test2");
        user2.setLastName("test2");
        user2.setEmail("test2@gmail.com");
        user2.setUserName("test2");
        user2.setPassword("test2");
        users = List.of(user1, user2);

        Provider provider = new Provider();
        provider.setFirstName("test3Provider");
        provider.setLastName("test3Provider");
        provider.setEmail("test3Provider@gmail.com");
        provider.setUserName("test3Provider");
        provider.setPassword("test3Provider");
        provider.setTva("BE123456789");
        provider.setPhoneNumber("0477777777");

        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        for (User user : users) {
            UserRepresentation userRep = mapUserRep(user);
            keycloak.realm(realm).users().create(userRep);
        }
        UserRepresentation providerRep = mapUserRep(provider);
        Response createProviderResponse = keycloak.realm(realm).users().create(providerRep);
        String userId;
        if (createProviderResponse.getStatus() == 201) {
            userId = CreatedResponseUtil.getCreatedId(createProviderResponse);
            RoleRepresentation providerRole = keycloak.realm(realm).roles().get("fournisseur").toRepresentation();
            keycloak.realm(realm).users().get(userId).roles().realmLevel().add(Collections.singletonList(providerRole));
        }

    }

    @Test
    @Order(1)
    public void updateUserTest() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        User user = new User();
        user.setFirstName("test2modified");
        user.setLastName("test2modified");
        user.setEmail("test2modified@gmail.com");
        user.setUserName("test2");
        user.setPassword("test2modified");
        UserRepresentation userRep = mapUserRep(user);

        String userId = keycloak.realm(realm).users().search("test2").get(0).getId();
        keycloak.realm(realm).users().get(userId).update(userRep);

        List<UserRepresentation> userRepresentations = keycloak.realm(realm).users().list();
        List<User> users = userRepresentations.stream().map(this::mapUser).toList();

        assertEquals(users.size(), 4);
        assertEquals(users.get(2).getUserName(), "test2");
        assertEquals(users.get(2).getEmail(), "test2modified@gmail.com");
    }
    @Test
    @Order(2)
    public void deleteUserTest() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();

        String userId = keycloak.realm(realm).users().search("test2").get(0).getId();
        keycloak.realm(realm).users().delete(userId);

        List<UserRepresentation> userRepresentations = keycloak.realm(realm).users().list();
        List<User> users = userRepresentations.stream().map(this::mapUser).toList();

        assertEquals(users.size(), 3);
    }
    @Test
    @Order(3)
    public void getProvidersTest() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        List<UserRepresentation> usersWithRole = keycloak.realm(realm).roles().get("fournisseur").getUserMembers();

        assertEquals(usersWithRole.size(), 1);
    }
    @Test
    @Order(4)
    public void createProviderTest() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        Provider provider = new Provider();
        provider.setFirstName("test4provider");
        provider.setLastName("test4provider");
        provider.setEmail("test4provider@gmail.com");
        provider.setUserName("test4provider");
        provider.setPassword("test4provider");
        provider.setTva("BE123456789");
        provider.setPhoneNumber("0477777777");

        UserRepresentation userRep = mapUserRep(provider);
        Response createProviderResponse = keycloak.realm(realm).users().create(userRep);

        String userId;
        if (createProviderResponse.getStatus() == 201) {
            userId = CreatedResponseUtil.getCreatedId(createProviderResponse);
            RoleRepresentation providerRole = keycloak.realm(realm).roles().get("fournisseur").toRepresentation();
            keycloak.realm(realm).users().get(userId).roles().realmLevel().add(Collections.singletonList(providerRole));
        }

        List<UserRepresentation> usersWithRole = keycloak.realm(realm).roles().get("fournisseur").getUserMembers();
        List<User> providers = usersWithRole.stream().map(this::mapUser).toList();

        assertEquals(providers.size(), 2);
    }

    @Test
    @Order(5)
    public void deleteProviderTest() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        List<UserRepresentation> usersWithRole = keycloak.realm(realm).roles().get("fournisseur").getUserMembers();
        String userId = usersWithRole.get(0).getId();
        keycloak.realm(realm).users().delete(userId);

        usersWithRole = keycloak.realm(realm).roles().get("fournisseur").getUserMembers();
        List<User> providers = usersWithRole.stream().map(this::mapUser).toList();

        assertEquals(providers.size(), 1);
    }

    @Test
    @Order(6)
    public void updateProviderTest() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        Provider provider = new Provider();
        provider.setFirstName("test4providerModified");
        provider.setLastName("test4providerModified");
        provider.setEmail("test4providermodified@gmail.com");
        provider.setUserName("test4provider");
        provider.setPassword("test4providerModified");
        provider.setTva("BE123456789");
        provider.setPhoneNumber("0477777777");

        UserRepresentation userRep = mapUserRep(provider);
        String userId = keycloak.realm(realm).users().search("test4provider").get(0).getId();
        keycloak.realm(realm).users().get(userId).update(userRep);

        List<UserRepresentation> usersWithRole = keycloak.realm(realm).roles().get("fournisseur").getUserMembers();
        List<User> providers = usersWithRole.stream().map(this::mapUser).toList();

        assertEquals(providers.get(0).getUserName(), "test4provider");
        assertEquals(providers.get(0).getEmail(), "test4providermodified@gmail.com");

    }


    @Test
    @Order(7)
    public void clean() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        List<UserRepresentation> users = keycloak.realm(realm).users().list();
        for (UserRepresentation user : users) {
            if(!user.getUsername().contains("admin"))
                keycloak.realm(realm).users().delete(user.getId());
        }
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

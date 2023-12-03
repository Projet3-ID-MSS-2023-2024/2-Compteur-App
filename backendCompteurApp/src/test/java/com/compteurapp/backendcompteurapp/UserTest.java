package com.compteurapp.backendcompteurapp;

import com.compteurapp.backendcompteurapp.model.Provider;
import com.compteurapp.backendcompteurapp.model.User;
import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.repository.UserDBRepository;
import com.compteurapp.backendcompteurapp.security.KeycloakSecurityUtilTest;
import com.compteurapp.backendcompteurapp.services.UserDBService;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
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
public class UserTest {


    @Autowired
    KeycloakSecurityUtilTest keycloakUtil;

    @Autowired
    UserDBRepository userDBRepository;

    @Autowired
    UserDBService userDBService;

    @Value("compteurapptest")
    private String realm;

    @Test
    @Order(0)
    public void init() {
        List<User> users;
        List<UserDB> userDBS;
        // ------------ User 1 ----------------
        User user1 = new User();
        user1.setFirstName("test1");
        user1.setLastName("test1");
        user1.setEmail("test1@gmail.com");
        user1.setUserName("test1");
        user1.setPassword("test1");

        UserDB userDB1 = new UserDB();
        userDB1.setFirstname(user1.getFirstName());
        userDB1.setLastname(user1.getLastName());
        userDB1.setEmail(user1.getEmail());
        userDB1.setUsername(user1.getUserName());

        // ------------ User 2 ----------------

        users = List.of(user1);

        // ------------ Provider ----------------
        Provider provider = new Provider();
        provider.setFirstName("test3Provider");
        provider.setLastName("test3Provider");
        provider.setEmail("test3Provider@gmail.com");
        provider.setUserName("test3Provider");
        provider.setPassword("test3Provider");
        provider.setTva("BE123456789");
        provider.setPhoneNumber("0477777777");

        UserDB userDB3 = new UserDB();
        userDB3.setFirstname(provider.getFirstName());
        userDB3.setLastname(provider.getLastName());
        userDB3.setEmail(provider.getEmail());
        userDB3.setUsername(provider.getUserName());
        userDB3.setTva(provider.getTva());
        userDB3.setPhoneNumber(provider.getPhoneNumber());
        userDB3.setRole("fournisseur");

        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        for (User user : users) {
            UserRepresentation userRep = mapUserRep(user);
            keycloak.realm(realm).users().create(userRep);
            userDB1.setId(keycloak.realm(realm).users().search(user.getUserName()).get(0).getId());
        }

        UserRepresentation providerRep = mapUserRep(provider);
        Response createProviderResponse = keycloak.realm(realm).users().create(providerRep);
        String userId;
        if (createProviderResponse.getStatus() == 201) {
            userId = CreatedResponseUtil.getCreatedId(createProviderResponse);
            userDB3.setId(userId);
            RoleRepresentation providerRole = keycloak.realm(realm).roles().get("fournisseur").toRepresentation();
            keycloak.realm(realm).users().get(userId).roles().realmLevel().add(Collections.singletonList(providerRole));
        }
        userDBS = List.of(userDB1, userDB3);
        userDBRepository.saveAll(userDBS);
    }

    @Test
    @Order(1)
    public void getUserByIdTest() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        String userId = keycloak.realm(realm).users().search("test1").get(0).getId();
        UserDB userDB = this.userDBService.getUserById(userId);

        assertEquals(userDB.getUsername(), "test1");
        assertEquals(userDB.getEmail(), "test1@gmail.com");
    }

    @Test
    @Order(2)
    public void updateUserTest() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        User user = new User();
        user.setFirstName("test1modified");
        user.setLastName("test1modified");
        user.setEmail("test1modified@gmail.com");
        user.setUserName("test1");
        user.setPassword("test1modified");

        UserRepresentation userRep = mapUserRep(user);

        String userId = keycloak.realm(realm).users().search("test1").get(0).getId();

        UserDB userDB = new UserDB();
        userDB.setFirstname(user.getFirstName());
        userDB.setLastname(user.getLastName());
        userDB.setEmail(user.getEmail());
        userDB.setUsername(user.getUserName());
        userDB.setId(userId);

        keycloak.realm(realm).users().get(userId).update(userRep);
        userDBRepository.save(userDB);

        List<UserRepresentation> userRepresentations = keycloak.realm(realm).users().list();
        List<User> users = userRepresentations.stream().map(this::mapUser).toList();

        assertEquals(users.size(), 3);
        assertEquals(users.get(1).getUserName(), "test1");
        assertEquals(users.get(1).getEmail(), "test1modified@gmail.com");

        UserDB userDBsearch = this.userDBService.getUserById(userId);

        assertEquals(userDBsearch.getUsername(), "test1");
        assertEquals(userDBsearch.getEmail(), "test1modified@gmail.com");
    }

    @Test
    @Order(3)
    public void deleteUserTest() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();

        String userId = keycloak.realm(realm).users().search("test1").get(0).getId();
        keycloak.realm(realm).users().delete(userId);
        userDBRepository.deleteById(userId);

        List<UserRepresentation> userRepresentations = keycloak.realm(realm).users().list();
        List<User> users = userRepresentations.stream().map(this::mapUser).toList();

        assertEquals(users.size(), 2);
    }

    @Test
    @Order(4)
    public void createUserTest() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        User user = new User();
        user.setFirstName("test4");
        user.setLastName("test4");
        user.setEmail("test4@gmail.com");
        user.setUserName("test4");
        user.setPassword("test4");

        UserDB userDB = new UserDB();
        userDB.setFirstname(user.getFirstName());
        userDB.setLastname(user.getLastName());
        userDB.setEmail(user.getEmail());
        userDB.setUsername(user.getUserName());

        UserRepresentation userRep = mapUserRep(user);
        Response createUserResponse = keycloak.realm(realm).users().create(userRep);
        String userId = userId = CreatedResponseUtil.getCreatedId(createUserResponse);
        userDB.setId(userId);
        userDBRepository.save(userDB);

        List<UserRepresentation> userRepresentations = keycloak.realm(realm).users().list();
        List<User> users = userRepresentations.stream().map(this::mapUser).toList();

        assertEquals(users.get(2).getUserName(), "test4");
        assertEquals(users.get(2).getEmail(), "test4@gmail.com");

        UserDB userDBsearch = this.userDBService.getUserById(userId);

        assertEquals(userDBsearch.getUsername(), "test4");
        assertEquals(userDBsearch.getEmail(), "test4@gmail.com");
    }

    @Test
    @Order(5)
    public void clean() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        List<UserRepresentation> users = keycloak.realm(realm).users().list();
        for (UserRepresentation user : users) {
            if(!user.getUsername().contains("admin"))
                keycloak.realm(realm).users().delete(user.getId());
        }
        userDBRepository.delete(userDBRepository.findByUsername("test3Provider"));
        userDBRepository.delete(userDBRepository.findByUsername("test4"));
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

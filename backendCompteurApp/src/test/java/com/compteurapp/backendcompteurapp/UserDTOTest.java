package com.compteurapp.backendcompteurapp;

import com.compteurapp.backendcompteurapp.DTO.ProviderDTO;
import com.compteurapp.backendcompteurapp.DTO.UserDTO;
import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.repository.UserDBRepository;
import com.compteurapp.backendcompteurapp.security.KeycloakSecurityUtilTest;
import com.compteurapp.backendcompteurapp.services.UserDBService;
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
public class UserDTOTest {


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
        List<UserDTO> userDTOS;
        List<UserDB> userDBS;
        // ------------ User 1 ----------------
        UserDTO userDTO1 = new UserDTO();
        userDTO1.setFirstName("test1");
        userDTO1.setLastName("test1");
        userDTO1.setEmail("test1@gmail.com");
        userDTO1.setUserName("test1");
        userDTO1.setPassword("test1");

        UserDB userDB1 = new UserDB();
        userDB1.setFirstname(userDTO1.getFirstName());
        userDB1.setLastname(userDTO1.getLastName());
        userDB1.setEmail(userDTO1.getEmail());
        userDB1.setUsername(userDTO1.getUserName());

        // ------------ User 2 ----------------

        userDTOS = List.of(userDTO1);

        // ------------ Provider ----------------
        ProviderDTO providerDTO = new ProviderDTO();
        providerDTO.setFirstName("test3Provider");
        providerDTO.setLastName("test3Provider");
        providerDTO.setEmail("test3Provider@gmail.com");
        providerDTO.setUserName("test3Provider");
        providerDTO.setPassword("test3Provider");
        providerDTO.setTva("BE123456789");
        providerDTO.setPhoneNumber("0477777777");

        UserDB userDB3 = new UserDB();
        userDB3.setFirstname(providerDTO.getFirstName());
        userDB3.setLastname(providerDTO.getLastName());
        userDB3.setEmail(providerDTO.getEmail());
        userDB3.setUsername(providerDTO.getUserName());
        userDB3.setTva(providerDTO.getTva());
        userDB3.setPhoneNumber(providerDTO.getPhoneNumber());
        userDB3.setRole("fournisseur");

        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        for (UserDTO userDTO : userDTOS) {
            UserRepresentation userRep = mapUserRep(userDTO);
            keycloak.realm(realm).users().create(userRep);
            userDB1.setId(keycloak.realm(realm).users().search(userDTO.getUserName()).get(0).getId());
        }

        UserRepresentation providerRep = mapUserRep(providerDTO);
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
        UserDTO userDTO = new UserDTO();
        userDTO.setFirstName("test1modified");
        userDTO.setLastName("test1modified");
        userDTO.setEmail("test1modified@gmail.com");
        userDTO.setUserName("test1");
        userDTO.setPassword("test1modified");

        UserRepresentation userRep = mapUserRep(userDTO);

        String userId = keycloak.realm(realm).users().search("test1").get(0).getId();

        UserDB userDB = new UserDB();
        userDB.setFirstname(userDTO.getFirstName());
        userDB.setLastname(userDTO.getLastName());
        userDB.setEmail(userDTO.getEmail());
        userDB.setUsername(userDTO.getUserName());
        userDB.setId(userId);

        keycloak.realm(realm).users().get(userId).update(userRep);
        userDBRepository.save(userDB);

        List<UserRepresentation> userRepresentations = keycloak.realm(realm).users().list();
        List<UserDTO> userDTOS = userRepresentations.stream().map(this::mapUser).toList();

        assertEquals(userDTOS.size(), 3);
        assertEquals(userDTOS.get(1).getUserName(), "test1");
        assertEquals(userDTOS.get(1).getEmail(), "test1modified@gmail.com");

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
        List<UserDTO> userDTOS = userRepresentations.stream().map(this::mapUser).toList();

        assertEquals(userDTOS.size(), 2);
    }

    @Test
    @Order(4)
    public void createUserTest() {
        Keycloak keycloak = keycloakUtil.getKeycloakInstance();
        UserDTO userDTO = new UserDTO();
        userDTO.setFirstName("test4");
        userDTO.setLastName("test4");
        userDTO.setEmail("test4@gmail.com");
        userDTO.setUserName("test4");
        userDTO.setPassword("test4");

        UserDB userDB = new UserDB();
        userDB.setFirstname(userDTO.getFirstName());
        userDB.setLastname(userDTO.getLastName());
        userDB.setEmail(userDTO.getEmail());
        userDB.setUsername(userDTO.getUserName());

        UserRepresentation userRep = mapUserRep(userDTO);
        Response createUserResponse = keycloak.realm(realm).users().create(userRep);
        String userId = userId = CreatedResponseUtil.getCreatedId(createUserResponse);
        userDB.setId(userId);
        userDBRepository.save(userDB);

        List<UserRepresentation> userRepresentations = keycloak.realm(realm).users().list();
        List<UserDTO> userDTOS = userRepresentations.stream().map(this::mapUser).toList();

        assertEquals(userDTOS.get(2).getUserName(), "test4");
        assertEquals(userDTOS.get(2).getEmail(), "test4@gmail.com");

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



    private UserDTO mapUser(UserRepresentation userRep) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userRep.getId());
        userDTO.setFirstName(userRep.getFirstName());
        userDTO.setLastName(userRep.getLastName());
        userDTO.setEmail(userRep.getEmail());
        userDTO.setUserName(userRep.getUsername());
        return userDTO;
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

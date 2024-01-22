package com.compteurapp.backendcompteurapp;


import static org.mockito.Mockito.*;

import com.compteurapp.backendcompteurapp.controller.CompteurDataController;
import com.compteurapp.backendcompteurapp.model.*;
import com.compteurapp.backendcompteurapp.repository.AdresseRepository;
import com.compteurapp.backendcompteurapp.repository.CategoryRepository;
import com.compteurapp.backendcompteurapp.repository.CompteurDataRepository;
import com.compteurapp.backendcompteurapp.repository.UserDBRepository;
import com.compteurapp.backendcompteurapp.security.KeycloakSecurityUtilTest;
import com.compteurapp.backendcompteurapp.services.CompteurDataService;
import com.compteurapp.backendcompteurapp.services.CompteurService;
import com.compteurapp.backendcompteurapp.services.UserDBService;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.*;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class CompteurTest {

    @Autowired
    CompteurService compteurService;


    @Autowired
    UserDBRepository userDBRepository;

    @Autowired
    UserDBService userDBService;

    @Autowired
    AdresseRepository adresseRepository;

    @Autowired
    CategoryRepository categoryRepository;

    public UserDB provider;
    public UserDB client;
    public Adresse adresse;
    public Category category;

    public Long id;
    public String idClient;
    public String idProvider;

    @BeforeEach
    public void init() {

        Category category = new Category();
        category.setName("testCategoy");
        category = categoryRepository.save(category);

        UserDB userDB = new UserDB();
        userDB.setFirstname("test44");
        userDB.setLastname("test4");
        userDB.setEmail("test4@gmail.com");
        userDB.setUsername("test4");
        userDB.setId("99999test");
        userDBRepository.save(userDB);

        UserDB provider = new UserDB();
        provider.setFirstname("test4");
        provider.setLastname("test4");
        provider.setEmail("test4@gmail.com");
        provider.setUsername("test4");
        provider.setId("9999providertest");
        provider.setTva("BE123456789");
        provider.setPhoneNumber("0477777777");
        provider.setCategory(category);

        userDBRepository.save(provider);

        Adresse adresse = new Adresse();
        adresse.setRue("rue de test");
        adresse.setNumero("1");
        adresse.setVille("test");
        adresse.setCodePostal("1000");
        adresse.setPays("test");
        adresse.setId(59999L);
        adresseRepository.save(adresse);

        this.category = category;
        this.provider = provider;
        this.adresse = adresse;
        this.client = userDB;

        Compteur compteur = new Compteur();
        compteur.setNom("test");
        compteur.setAdresse(this.adresse);
        compteur.setCategory(this.category);
        compteur.setProvider(this.provider);
        compteur.setClient(this.client);
        Compteur compteurCreate = compteurService.createCompteur(compteur);
        this.id = compteurCreate.getId();
        this.idClient = compteurCreate.getClient().getId();
        this.idProvider = compteurCreate.getProvider().getId();

    }


    @Order(2)
    @Test
    public void testGetCompteurs(){
        Optional<Compteur> compteurCreate = compteurService.getOneCompteur(this.id);
        assertFalse(compteurCreate.isEmpty());
    }

    @Order(3)
    @Test
    public void testGetCompteursByProviderId(){
        List<Compteur> compteurs = compteurService.findCompteurByIdProvider(this.provider.getId());
        int lastIndex = compteurs.size() - 1;
        assertEquals(compteurs.get(lastIndex).getId(),this.id);
        assertEquals(compteurs.get(lastIndex).getClient().getId(),this.idClient);
        assertEquals(compteurs.get(lastIndex).getProvider().getId(),this.idProvider);
    }

    @Order(4)
    @Test
    public void testModifyCompteur(){
        Compteur compteur = new Compteur();
        compteur.setNom("modified");
        compteur.setId(this.id);
        compteur.setAdresse(this.adresse);
        compteur.setClient(this.client);
        compteur.setCategory(this.category);
        compteur.setProvider(this.provider);
        compteurService.createCompteur(compteur);
        Optional<Compteur> compteurModified = compteurService.getOneCompteur(this.id);
        assertEquals("modified", compteurModified.get().getNom());
    }

    @Order(5)
    @Test
    public void testDeleteCompteur(){
        compteurService.deleteById(this.id);
        Optional<Compteur> compteurDeleted = compteurService.getOneCompteur(this.id);
        assertTrue(compteurDeleted.isEmpty());
    }

    @AfterEach
    void clean() {
        try {
            compteurService.deleteById(this.id);
            userDBRepository.deleteById(this.client.getId());
            userDBRepository.deleteById(this.provider.getId());
            adresseRepository.deleteById(this.adresse.getId());
            categoryRepository.deleteById(this.category.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}

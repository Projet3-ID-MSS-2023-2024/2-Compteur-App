package com.compteurapp.backendcompteurapp;

import static org.mockito.Mockito.*;

import com.compteurapp.backendcompteurapp.controller.CompteurDataController;
import com.compteurapp.backendcompteurapp.model.*;
import com.compteurapp.backendcompteurapp.repository.AdresseRepository;
import com.compteurapp.backendcompteurapp.repository.CompteurDataRepository;
import com.compteurapp.backendcompteurapp.repository.UserDBRepository;
import com.compteurapp.backendcompteurapp.services.CompteurDataService;
import com.compteurapp.backendcompteurapp.services.CompteurService;
import com.compteurapp.backendcompteurapp.services.UserDBService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.util.Date;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class CompteurDataControllerTest {

    @Autowired
    CompteurService compteurService;


    @Autowired
    UserDBRepository userDBRepository;

    @Autowired
    UserDBService userDBService;

    @Autowired
    AdresseRepository adresseRepository;

    @Autowired
    CompteurDataRepository compteurDataRepository;

    public UserDB provider;
    public UserDB client;
    public Adresse adresse;
    public Category category;

    public Compteur compteur;

    public CompteurData compteurData;


    @BeforeEach
    @Test
    @Order(0)
    public void init() {

        Category category = new Category();
        category.setId(1L);

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
        compteur.setId(compteurCreate.getId());
        this.compteur = compteur;

        CompteurData compteurData = new CompteurData();
        compteurData.setCompteur(this.compteur);
        compteurData.setValeur(100.0);
        compteurData.setPhoto("test");
        compteurData.setDate(new Date());
        compteurData.setClient(this.client);
        compteurData.setProvider(this.provider);
        compteurDataRepository.save(compteurData);
        compteurData.setId(compteurData.getId());
        this.compteurData = compteurData;

    }

    @Order(2)
    @Test
    public void testGetCompteurData(){
        Optional<CompteurData> compteurData = compteurDataRepository.findById(this.compteurData.getId());
        assertFalse(compteurData.isEmpty());
    }

    @Order(3)
    @Test
    public void testModifyCompteurData(){
        CompteurData compteurData = new CompteurData();
        compteurData.setDate(new Date());
        compteurData.setValeur(200.0);
        compteurData.setPhoto("modified");
        compteurData.setCompteur(this.compteur);
        compteurData.setClient(this.client);
        compteurData.setProvider(this.provider);
        compteurData.setId(this.compteurData.getId());
        compteurDataRepository.save(compteurData);
        assertEquals("modified", compteurData.getPhoto());
    }

    @Order(4)
    @Test
    public void testDeleteCompteurData(){
        compteurDataRepository.deleteById(this.compteurData.getId());
        Optional<CompteurData> compteurDeleted = compteurDataRepository.findById(this.compteurData.getId());
        assertTrue(compteurDeleted.isEmpty());
    }

    @Test
    @Order(5)
    void clean() {
        try {
            compteurService.deleteById(this.compteur.getId());
            userDBRepository.deleteById(this.client.getId());
            userDBRepository.deleteById(this.provider.getId());
            adresseRepository.deleteById(this.adresse.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

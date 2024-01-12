package com.compteurapp.backendcompteurapp;
import static org.mockito.Mockito.*;

import com.compteurapp.backendcompteurapp.DTO.FactureDTO;
import com.compteurapp.backendcompteurapp.DTO.FactureSendDTO;
import com.compteurapp.backendcompteurapp.controller.CompteurDataController;
import com.compteurapp.backendcompteurapp.controller.FactureController;
import com.compteurapp.backendcompteurapp.enums.FactureStatement;
import com.compteurapp.backendcompteurapp.model.*;
import com.compteurapp.backendcompteurapp.repository.AdresseRepository;
import com.compteurapp.backendcompteurapp.repository.CompteurDataRepository;
import com.compteurapp.backendcompteurapp.repository.FactureRepository;
import com.compteurapp.backendcompteurapp.repository.UserDBRepository;
import com.compteurapp.backendcompteurapp.services.CompteurDataService;
import com.compteurapp.backendcompteurapp.services.CompteurService;
import com.compteurapp.backendcompteurapp.services.UserDBService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.keycloak.representations.AccessTokenResponse;
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
public class FactureTest {
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

    @Autowired
    FactureRepository factureRepository;

    @Autowired
    FactureController factureController;

    private  UserDB provider;
    private UserDB client;
    private Adresse adresse;
    private Category category;

    private Compteur compteur;

    private CompteurData compteurData;

    private Facture facture;

    private FactureDTO factureDTO;

    private FactureStatement factureStatement;

    private long compteurDataId;

    private long factureId;

    private long compteurId;

    private long addresseId;


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
        this.client = userDB;
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
        this.provider = provider;
        userDBRepository.save(provider);

        Adresse adresse = new Adresse();
        adresse.setRue("rue de test");
        adresse.setNumero("1");
        adresse.setVille("test");
        adresse.setCodePostal("1000");
        adresse.setPays("test");
        this.adresse = adresse;
        adresseRepository.save(adresse);
        this.addresseId = adresse.getId();

        Compteur compteur = new Compteur();
        compteur.setNom("test");
        compteur.setAdresse(this.adresse);
        compteur.setCategory(this.category);
        compteur.setProvider(this.provider);
        compteur.setClient(this.client);
        this.compteur = compteur;
        Compteur compteurCreate = compteurService.createCompteur(compteur);
        this.compteurId = compteur.getId();

        CompteurData compteurData = new CompteurData();
        compteurData.setCompteur(this.compteur);
        compteurData.setValeur(100.0);
        compteurData.setPhoto("test");
        compteurData.setDate(new Date());
        compteurData.setClient(this.client);
        compteurData.setProvider(this.provider);
        compteurDataRepository.save(compteurData);
        this.compteurDataId = compteurData.getId();

        Facture facture = new Facture();
        facture.setPrix(10);
        facture.setEtat(factureStatement.IMPAYER);
        facture.setCompteurData(this.compteurData);
        factureRepository.save(facture);
        this.factureId = facture.getId();

        this.category = category;
        this.provider = provider;
        this.adresse = adresse;
        this.client = userDB;
        this.facture = facture;
        this.compteur = compteur;
        this.compteurData = compteurData;
    }


    @Test
    @Order(1)
    public void testGetFactureByUserID(){
        List<FactureSendDTO> factureList = factureController.getFactureByIdUser("99999test", FactureStatement.IMPAYER);
        assertEquals(1, factureList.size());
    }


    @Test
    @Order(2)
    void clean() {
            factureRepository.deleteById(this.factureId);
            compteurDataRepository.deleteById(this.compteurDataId);
            compteurService.deleteById(this.compteurId);
            userDBRepository.deleteById("99999test");
            userDBRepository.deleteById("9999providertest");
            adresseRepository.deleteById(this.addresseId);

    }
}

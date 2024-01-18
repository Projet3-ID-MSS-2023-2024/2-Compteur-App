package com.compteurapp.backendcompteurapp;
import static org.mockito.Mockito.*;

import com.compteurapp.backendcompteurapp.DTO.FactureDTO;
import com.compteurapp.backendcompteurapp.DTO.FactureSendDTO;
import com.compteurapp.backendcompteurapp.DTO.FactureUpdateDTO;
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
import org.junit.jupiter.api.AfterEach;
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



    @BeforeEach
    public void init() {

        Category category = new Category();
        category.setId(2L);

        UserDB userDB = new UserDB();
        userDB.setFirstname("test44");
        userDB.setLastname("test4");
        userDB.setEmail("test4@gmail.com");
        userDB.setUsername("test4");
        userDB.setId("999test");
        userDBRepository.save(userDB);

        UserDB provider = new UserDB();
        provider.setFirstname("test4");
        provider.setLastname("test4");
        provider.setEmail("test4@gmail.com");
        provider.setUsername("test4");
        provider.setId("999providertest");
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

        Facture facture = new Facture();
        facture.setEtat(FactureStatement.IMPAYER);
        facture.setPrix(992911.0);
        facture.setCompteurData(this.compteurData);
        factureRepository.save(facture);
        facture.setId(facture.getId());
        this.facture = facture;
    }

    @Order(2)
    @Test
    public void testGetFactureByUserId() {
        List<FactureSendDTO> facture = factureController.getFactureByIdUser(this.client.getId(), FactureStatement.IMPAYER);
        assertEquals(facture.get(0).id, this.facture.getId());
    }

    @Order(3)
    @Test
    public void test_createFacture_createsNewFactureWithGivenFactureDTO() {

        FactureDTO factureDTO = new FactureDTO();
        factureDTO.prix = 10.0;
        factureDTO.etat = FactureStatement.IMPAYER;
        factureDTO.idCompteurData = this.compteurData.getId();


        Facture result = factureController.createFacture(factureDTO);


        assertNotNull(result);
        assertEquals(factureDTO.prix, result.getPrix(), 0.01);
        assertEquals(factureDTO.etat, result.getEtat());
        assertEquals(factureDTO.idCompteurData, result.getCompteurData().getId());
        factureRepository.deleteById(result.getId());
    }

    @Order(4)
    @Test
    public void test_updateStatus_Facture() {

        FactureDTO factureDTO = new FactureDTO();
        factureDTO.prix = 10.0;
        factureDTO.etat = FactureStatement.IMPAYER;
        factureDTO.idCompteurData = this.compteurData.getId();

        FactureUpdateDTO factureUpdateDTO = new FactureUpdateDTO();
        factureUpdateDTO.id = this.facture.getId();
        factureUpdateDTO.etat = FactureStatement.PAYER;


        Facture result = factureController.createFacture(factureDTO);
        Facture resultUpdate = factureController.updateStatus(factureUpdateDTO);


        assertNotNull(result);
        assertEquals(factureDTO.prix, result.getPrix(), 0.01);
        assertEquals(factureDTO.etat, result.getEtat());
        assertEquals(factureDTO.idCompteurData, result.getCompteurData().getId());

        assertEquals(result.getCompteurData().getId(), resultUpdate.getCompteurData().getId());

        factureRepository.deleteById(result.getId());
    }

    @AfterEach
    void clean() {
        try {
            factureRepository.deleteById(this.facture.getId());
            compteurDataRepository.deleteById(this.compteurData.getId());
            compteurService.deleteById(this.compteur.getId());
            userDBRepository.deleteById(this.client.getId());
            userDBRepository.deleteById(this.provider.getId());
            adresseRepository.deleteById(this.adresse.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

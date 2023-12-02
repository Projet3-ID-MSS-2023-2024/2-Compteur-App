package com.compteurapp.backendcompteurapp;

import static org.mockito.Mockito.*;

import com.compteurapp.backendcompteurapp.controller.CompteurDataController;
import com.compteurapp.backendcompteurapp.model.Compteur;
import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.model.FactureStatement;
import com.compteurapp.backendcompteurapp.repository.CompteurDataRepository;
import com.compteurapp.backendcompteurapp.services.CompteurDataService;
import org.junit.jupiter.api.BeforeEach;
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
import java.util.List;

@SpringBootTest
public class CompteurDataControllerTest {

    @Autowired
    CompteurDataService compteurDataService;

    @BeforeEach
    public void init(){
        Compteur compteurCompteur = new Compteur();
        compteurCompteur.setId(1L);
        CompteurData compteur = new CompteurData();
        compteur.setValeur(10.0);
        compteur.setVendeur(25L);
        compteur.setClient(133L);
        compteur.setCompteur(compteurCompteur);
        compteur.setPhoto("picture");
        CompteurData compteur2 = new CompteurData();
        compteur2.setValeur(100.0);
        compteur2.setVendeur(25L);
        compteur2.setClient(133L);
        compteur2.setPhoto("picture2");
        compteur2.setCompteur(compteurCompteur);
        CompteurData compteur3 = new CompteurData();
        compteur3.setValeur(300.0);
        compteur3.setVendeur(325L);
        compteur3.setClient(133L);
        compteur3.setPhoto("picture3");
        compteur3.setCompteur(compteurCompteur);
        compteurDataService.createCompteurData(compteur);
        compteurDataService.createCompteurData(compteur2);
        compteurDataService.createCompteurData(compteur3);
    }

    @Test
    public void testAddData(){
        Compteur compteurCompteur = new Compteur();
        CompteurData compteur = new CompteurData();
        compteur.setCompteur(compteurCompteur);
        compteur.setValeur(10.0);
        compteur.setVendeur(25L);
        compteur.setClient(5L);
        compteur.setPhoto("dede");
        CompteurData compteurCreate = compteurDataService.createCompteurData(compteur);
        assertEquals(10.0, compteurCreate.getValeur(), 0.001);
        assertEquals(25L, compteurCreate.getVendeur());
        assertEquals("dede", compteurCreate.getPhoto());
    }

    @Test
    public void testGetCompteurDataByClientId(){
        List<CompteurData> clientCompteurData = compteurDataService
                .getCompteurDataByClientId(133L, 0, 1);
        assertEquals(10.0, clientCompteurData.get(0).getValeur(), 0.001);
    }

    @Test
    public void testGetCompteurDataByVendeurIdWithoutFacture(){
        List<CompteurData> vendeurCompteurData = compteurDataService
                .getCompteurDataByVendeurIdWithoutFacture(325L,0,1);
        assertEquals(133.0, vendeurCompteurData.get(0).getClient(), 0.001);
    }

    @Test
    public void testGetCompteurDataByVendeurIdAndClientIdWithoutFacture(){
        List<CompteurData> vendeurCompteurDataClient = compteurDataService
                .getCompteurDataByVendeurIdAndClientIdWithoutFacture(325L, 133L, 0, 1);
        assertEquals("picture3", vendeurCompteurDataClient.get(0).getPhoto());
    }

    /* Doit rajouter test quand il y auras le compteur de fait */
    /* Doit rajouter test quand il y auras la facture de fait */
}
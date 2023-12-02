package com.compteurapp.backendcompteurapp;


import static org.mockito.Mockito.*;

import com.compteurapp.backendcompteurapp.controller.CompteurDataController;
import com.compteurapp.backendcompteurapp.model.*;
import com.compteurapp.backendcompteurapp.repository.CompteurDataRepository;
import com.compteurapp.backendcompteurapp.services.CompteurDataService;
import com.compteurapp.backendcompteurapp.services.CompteurService;
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
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class CompteurTest {

    @Autowired
    CompteurService compteurService;

    public Long id;

    @BeforeEach
    public void init(){
        Adresse adresse = new Adresse();
        adresse.setId(2L);
        Category category = new Category();
        category.setId(1L);
        Compteur compteur = new Compteur();
        compteur.setNom("test");
        compteur.setAdresse(adresse);
        compteur.setCategory(category);
        compteur.setFournisseur("6293da1e-5978-4f79-ba57-3b33d8f5bff1");
        compteur.setUser("e712c55e-696b-4136-bcc8-2d3e9d53111f");
        Compteur compteurCreate = compteurService.createCompteur(compteur);
        this.id = compteurCreate.getId();
    }

    @Order(1)
    @Test
    public void testAddCompteur(){
        Adresse adresse = new Adresse();
        adresse.setId(2L);
        Category category = new Category();
        category.setId(1L);
        Compteur compteur = new Compteur();
        compteur.setNom("test");
        compteur.setAdresse(adresse);
        compteur.setCategory(category);
        compteur.setFournisseur("6293da1e-5978-4f79-ba57-3b33d8f5bff1");
        compteur.setUser("e712c55e-696b-4136-bcc8-2d3e9d53111f");


        Compteur compteurCreate = compteurService.createCompteur(compteur);
        assertEquals("test", compteurCreate.getNom());
    }

    @Order(2)
    @Test
    public void testGetCompteurs(){
        List<Compteur> compteurCreate = compteurService.findCompteurByIdUser("e712c55e-696b-4136-bcc8-2d3e9d53111f");
        assertFalse(compteurCreate.isEmpty());
    }

    @Order(3)
    @Test
    public void testModifyCompteur(){
        Compteur compteur = new Compteur();
        compteur.setId(this.id);
        Adresse adresse = new Adresse();
        adresse.setId(2L);
        Category category = new Category();
        category.setId(3L);
        compteur.setNom("modified");
        compteur.setAdresse(adresse);
        compteur.setCategory(category);
        compteur.setFournisseur("6293da1e-5978-4f79-ba57-3b33d8f5bff1");
        compteur.setUser("e712c55e-696b-4136-bcc8-2d3e9d53111f");
        compteurService.createCompteur(compteur);
        Optional<Compteur> compteurModified = compteurService.getOneCompteur(this.id);
        assertEquals("modified", compteurModified.get().getNom());
    }

    @Order(4)
    @Test
    public void testDeleteCompteur(){
        compteurService.deleteById(this.id);
        Optional<Compteur> compteurDeleted = compteurService.getOneCompteur(this.id);
        assertTrue(compteurDeleted.isEmpty());
    }







}
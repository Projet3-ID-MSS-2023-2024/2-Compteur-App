package com.compteurapp.backendcompteurapp;

import com.compteurapp.backendcompteurapp.model.Adresse;
import com.compteurapp.backendcompteurapp.model.Compteur;
import com.compteurapp.backendcompteurapp.model.User;
import com.compteurapp.backendcompteurapp.services.AdresseService;
import com.compteurapp.backendcompteurapp.services.UserDBService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;




@SpringBootTest
public class UserDBTest {
    @Autowired
    private UserDBService userDBService;

    @Test
    @Order(1)
    public void testGetAdresse() {

        Adresse adresse = userDBService.getAdresseByUsername("admin");
        assertEquals(adresse.getId(),5);
    }
}

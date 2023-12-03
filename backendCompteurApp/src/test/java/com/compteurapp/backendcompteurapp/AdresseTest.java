package com.compteurapp.backendcompteurapp;

import com.compteurapp.backendcompteurapp.model.Adresse;
import com.compteurapp.backendcompteurapp.model.Compteur;
import com.compteurapp.backendcompteurapp.services.AdresseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class AdresseTest {
    @Autowired
    private AdresseService adresseService;

    @Test
    @Order(1)
    public void testAddAdresse() {
        Adresse adresse = new Adresse("Rue de la Paix", "123", "75001", "Paris", "France");
        Adresse adresseCree = adresseService.addAdresse(adresse);

        assertEquals("Rue de la Paix", adresseCree.getRue());
        assertEquals("123", adresseCree.getNumero());
        assertEquals("75001", adresseCree.getCodePostal());
        assertEquals("Paris", adresseCree.getVille());
        assertEquals("France", adresseCree.getPays());

    }

    @Test
    @Order(3)
    public void testUpadateAdresse() {
        Adresse adresse = new Adresse(100L,"Rue de la Paix", "123", "75001", "Paris", "France");
        try {
          adresseService.updateAdresse(adresse);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        Optional<Adresse> updatedAdress = adresseService.getAdresseById(100);

        assertEquals("Rue de la Paix", updatedAdress.get().getRue());
        assertEquals("123", updatedAdress.get().getNumero());
        assertEquals("75001", updatedAdress.get().getCodePostal());
        assertEquals("Paris", updatedAdress.get().getVille());
        assertEquals("France", updatedAdress.get().getPays());
    }

    @Test
    @Order(2)
    public void testGetAdresseById() {
        Optional<Adresse> retrievedAdresse = adresseService.getAdresseById(100);

        assertEquals("Rue de la Paix", retrievedAdresse.get().getRue());
        assertEquals("123", retrievedAdresse.get().getNumero());
        assertEquals("75001", retrievedAdresse.get().getCodePostal());
        assertEquals("Paris", retrievedAdresse.get().getVille());
        assertEquals("France", retrievedAdresse.get().getPays());
    }
    @Test
    @Order(4)
    public void testDeleteAdresse() {
        Adresse adresse = new Adresse("Rue de la Paix", "123", "75001", "Paris", "France");
        Adresse adresseCree = adresseService.addAdresse(adresse);

        adresseService.delete(adresseCree.getId());

        Optional<Adresse> adresseDeleted = adresseService.getAdresseById(adresseCree.getId());
        assertTrue(adresseDeleted.isEmpty());
    }
}

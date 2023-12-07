package com.compteurapp.backendcompteurapp;

import com.compteurapp.backendcompteurapp.model.Adresse;
import com.compteurapp.backendcompteurapp.model.Category;
import com.compteurapp.backendcompteurapp.model.User;
import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.services.AdresseService;
import com.compteurapp.backendcompteurapp.services.KeycloakService;
import com.compteurapp.backendcompteurapp.services.UserDBService;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AdresseTest {

    @Autowired
    AdresseService adresseService;

    @Autowired
    UserDBService userDBService;

    @Autowired
    KeycloakService keycloakService;

    @Test
    @Order(1)
    public void testAddAdresse(){

        Adresse adresse = new Adresse();
        adresse.setNumero("10");
        adresse.setPays("Italy");
        adresse.setRue("Rue des tests");
        adresse.setVille("Rome");
        adresse.setCodePostal("14");
        Adresse adresseCree = adresseService.addAdresse(adresse);

        assertNotNull(adresseCree.getId());
        assertEquals(adresseCree.getNumero(),"10");
        assertEquals(adresseCree.getPays(),"Italy");
        assertEquals(adresseCree.getVille(),"Rome");
        assertEquals(adresseCree.getRue(),"Rue des tests");
        assertEquals(adresseCree.getCodePostal(),"14");
    }

    @Test
    @Order(2)
    public void testUpdateAdresse() throws Exception {

        Adresse adresse = new Adresse();
        adresse.setNumero("10");
        adresse.setPays("Italy");
        adresse.setRue("Rue des tests");
        adresse.setVille("Rome");
        adresse.setCodePostal("14");
        Adresse adresseCree = adresseService.addAdresse(adresse);


        adresse.setId(adresseCree.getId());
        adresse.setNumero("11");
        adresse.setPays("France");
        adresse.setRue("Rue des updates");
        adresse.setVille("Paris");
        adresse.setCodePostal("12");
        Adresse adresseUpdated = adresseService.addAdresse(adresse);

        adresseService.updateAdresse(adresse);

        assertEquals(adresseUpdated.getId(),adresseCree.getId());
        assertEquals(adresseUpdated.getNumero(),"11");
        assertEquals(adresseUpdated.getPays(),"France");
        assertEquals(adresseUpdated.getVille(),"Paris");
        assertEquals(adresseUpdated.getRue(),"Rue des updates");
        assertEquals(adresseUpdated.getCodePostal(),"12");
    }



    @Test
    @Order(3)
    public void testGetAdresseByUsername() {

        Adresse adresse = new Adresse();

        adresse.setNumero("11");
        adresse.setPays("France");
        adresse.setRue("Rue des updates");
        adresse.setVille("Paris");
        adresse.setCodePostal("12");
        Adresse adresseCree = adresseService.addAdresse(adresse);

        UserDB user = new UserDB();

        user.setAdresse(adresseCree);
        user.setUsername("UserTest");
        user.setEmail("test@gmail.com");
        user.setCategory(null);
        user.setFirstname("Jean");
        user.setLastname("Louis");
        user.setRole("client");
        user.setTva(null);
        user.setPhoneNumber("0411224555");

        //keycloakService.updateUser("8f5aa930-67d4-4fb9-a2c8-e18d6a5c1887",user);

        Adresse adresseGet = adresseService.getAdresseByUserName("UserTest");

        assertEquals(adresseGet.getRue(),"Rue des updates");
        assertEquals(adresseCree.getNumero(),"11");
        assertEquals(adresseCree.getPays(),"France");
        assertEquals(adresseCree.getCodePostal(),"12");
        assertEquals(adresseCree.getVille(),"Paris");
    }
}

package com.compteurapp.backendcompteurapp;

import com.compteurapp.backendcompteurapp.model.Adresse;
import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.DTO.AdresseDTO;
import com.compteurapp.backendcompteurapp.services.AdresseService;
import com.compteurapp.backendcompteurapp.services.KeycloakService;
import com.compteurapp.backendcompteurapp.services.UserDBService;
import com.compteurapp.backendcompteurapp.repository.AdresseRepository;
import com.compteurapp.backendcompteurapp.repository.UserDBRepository;
import org.aspectj.apache.bcel.util.Repository;
import org.junit.jupiter.api.*;
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

    @Autowired
    AdresseRepository adresseRepository;

    @Autowired
    UserDBRepository userDBRepository;


    public Adresse testAdresse;
    public UserDB testUser;


    @BeforeEach
    public void init(){
        Adresse adresse = new Adresse();
        adresse.setNumero("10");
        adresse.setPays("Italy");
        adresse.setRue("Rue des tests");
        adresse.setVille("Rome");
        adresse.setCodePostal("14");
        adresse.setId(5555L);
        this.testAdresse = adresseService.addAdresse(adresse);

        UserDB user = new UserDB();
        user.setAdresse(testAdresse);
        user.setRole("client");
        user.setUsername("TestUser");
        user.setId("5555");

        userDBRepository.save(user);
        this.testUser = userDBService.getUserById("5555");
    }

    @AfterEach
     void clean(){
        userDBRepository.deleteById(this.testUser.getId());
        adresseRepository.deleteById(this.testAdresse.getId());
    }

    @Test
    @Order(1)
    public void testAddAdresse(){

        assertNotNull(this.testAdresse.getId());
        assertEquals(this.testAdresse.getNumero(),"10");
        assertEquals(this.testAdresse.getPays(),"Italy");
        assertEquals(this.testAdresse.getVille(),"Rome");
        assertEquals(this.testAdresse.getRue(),"Rue des tests");
        assertEquals(this.testAdresse.getCodePostal(),"14");
    }

    @Test
    @Order(2)
    public void testUpdateAdresse() throws Exception {

        AdresseDTO adresse = new AdresseDTO("Rue des updates","11","12","Paris","France",this.testUser.getId());
        adresse.setId(this.testAdresse.getId());

        Adresse adresseUpdated = adresseService.updateAdresse(adresse);

        assertEquals(adresseUpdated.getId(),this.testAdresse.getId());
        assertEquals(adresseUpdated.getNumero(),"11");
        assertEquals(adresseUpdated.getPays(),"France");
        assertEquals(adresseUpdated.getVille(),"Paris");
        assertEquals(adresseUpdated.getRue(),"Rue des updates");
        assertEquals(adresseUpdated.getCodePostal(),"12");
    }

    @Test
    @Order(3)
    public void testGetAdresseByUsername() {
        Adresse adresseGet = adresseService.getAdresseByUserName("TestUser");

        assertEquals(this.testAdresse.getId(),adresseGet.getId());
        assertEquals(adresseGet.getNumero(),"10");
        assertEquals(adresseGet.getPays(),"Italy");
        assertEquals(adresseGet.getVille(),"Rome");
        assertEquals(adresseGet.getRue(),"Rue des tests");
        assertEquals(adresseGet.getCodePostal(),"14");
    }

    @Test
    @Order(4)
    public void testGetAdresseByUserId(){
        Adresse adresseGet = adresseService.getAdresseByUserId(this.testUser.getId());

        assertEquals(this.testAdresse.getId(),adresseGet.getId());
        assertEquals(adresseGet.getNumero(),"10");
        assertEquals(adresseGet.getPays(),"Italy");
        assertEquals(adresseGet.getVille(),"Rome");
        assertEquals(adresseGet.getRue(),"Rue des tests");
        assertEquals(adresseGet.getCodePostal(),"14");
    }
}

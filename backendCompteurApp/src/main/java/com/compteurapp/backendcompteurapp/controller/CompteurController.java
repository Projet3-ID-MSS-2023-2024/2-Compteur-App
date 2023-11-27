package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.exception.ResourceNotFoundException;
import com.compteurapp.backendcompteurapp.model.Adresse;
import com.compteurapp.backendcompteurapp.model.Category;
import com.compteurapp.backendcompteurapp.model.Compteur;
import com.compteurapp.backendcompteurapp.model.CompteurData;
import jakarta.validation.Valid;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import com.compteurapp.backendcompteurapp.services.CompteurService;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
public class CompteurController {

    @Autowired
    CompteurService service;


    @PostMapping("/compteur")
    public Compteur createCompteur(@RequestParam String nom,
                                           @RequestParam Long id_user,
                                            @RequestParam Long id_fournisseur,
                                           @RequestParam Long id_category,
                                           @RequestParam Long id_adresse) throws IOException, IOException {


        Category category = new Category();
        category.setId(id_category);

        Adresse adresse = new Adresse();
        adresse.setId(id_adresse);

        Compteur compteur = new Compteur();
        compteur.setNom(nom);
        compteur.setAdresse(adresse);
        compteur.setCategory(category);
        compteur.setId_user(id_user);
        compteur.setId_fournisseur(id_fournisseur);


        return service.createCompteur(compteur);
    }

    @GetMapping("/compteur")
    public List<Compteur> getCompteur(){
        return service.getAllCompteur();
    }
}

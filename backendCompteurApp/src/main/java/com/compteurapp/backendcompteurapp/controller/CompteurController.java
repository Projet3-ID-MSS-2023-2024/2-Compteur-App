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
    public Compteur createCompteur(@RequestBody Compteur compteur) throws IOException, IOException {
        return service.createCompteur(compteur);
    }


    @GetMapping("/compteur")
    public List<Compteur> getCompteur(){
        return service.getAllCompteur();
    }
}

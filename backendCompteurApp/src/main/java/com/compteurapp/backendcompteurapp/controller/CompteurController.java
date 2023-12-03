package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.DTO.CompteurDto;
import com.compteurapp.backendcompteurapp.DTO.CompteurSenderDTO;
import com.compteurapp.backendcompteurapp.exception.ResourceNotFoundException;
import com.compteurapp.backendcompteurapp.mapper.CompteurMapper;
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
    CompteurMapper compteurMapper;

    @Autowired
    CompteurService compteurService;


    @PostMapping("/compteur")
    public CompteurSenderDTO createCompteur(@RequestBody CompteurDto compteurDto){
        CompteurSenderDTO compteur = new CompteurSenderDTO();
        compteur = this.compteurMapper.createCompteurMapping(compteurDto);
        return compteur;
    }

    @GetMapping("/compteur/{id}")
    public List<CompteurSenderDTO> getUserCompter(@PathVariable String id){
        return this.compteurMapper.getCompteurList(id);
    }

    @DeleteMapping("/compteur/{id}")
    public boolean delete(@PathVariable Long id){
        return this.compteurService.deleteById(id);
    }

    @PutMapping("/compteur")
    public CompteurSenderDTO updateAdresse(@RequestBody CompteurDto compteurDto) throws Exception {
        CompteurSenderDTO compteurSenderDTO = new CompteurSenderDTO();
        compteurSenderDTO = this.compteurMapper.createCompteurMapping(compteurDto);
        return compteurSenderDTO;
    }



}
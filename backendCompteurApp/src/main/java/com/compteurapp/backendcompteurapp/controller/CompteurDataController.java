package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.exception.ResourceNotFoundException;
import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.repository.CompteurDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CompteurDataController {

    @Autowired
    CompteurDataRepository repository;

    @GetMapping("/getCompteurData/{id}")
    public CompteurData getCompteurData(@PathVariable Long id){
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CompteurData not found with id " + id));
    }



}

package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.exception.ResourceNotFoundException;
import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.repository.CompteurDataRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api")
public class CompteurDataController {

    @Autowired
    CompteurDataRepository repository;

    @GetMapping("/getCompteurDataByClientId/{idClient}")
    public List<CompteurData> getCompteurDataByClientId(@PathVariable Long idClient) {
        List<CompteurData> compteurDataList = repository.findByIdClient(idClient);
        if (compteurDataList.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with client id " + idClient);
        }
        return compteurDataList;
    }

    @GetMapping("/getCompteurDataByVendeurId/{idVendeur}")
    public List<CompteurData> getCompteurDataByVendeurId(@PathVariable Long idVendeur){
        List<CompteurData> compteurDataList = repository.findByIdVendeur(idVendeur);
        if (compteurDataList.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with vendeur id " + idVendeur);
        }
        return compteurDataList;
    }

    @PostMapping("/createCompteurData")
    public CompteurData createCompteurData(@Valid @RequestBody CompteurData compteurData) {
        return repository.save(compteurData);
    }



}

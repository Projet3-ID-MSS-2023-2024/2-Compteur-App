package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.DTO.FactureDTO;
import com.compteurapp.backendcompteurapp.DTO.FactureSendDTO;
import com.compteurapp.backendcompteurapp.mapper.FactureMapper;
import com.compteurapp.backendcompteurapp.model.Facture;
import com.compteurapp.backendcompteurapp.services.FactureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FactureController {

    @Autowired
    private FactureMapper factureMapper;

    @Autowired
    private FactureService service;

    @PostMapping("/facture")
    public Facture createFacture(@RequestBody FactureDTO factureDTO){
        return this.factureMapper.createFacture(factureDTO);
    }

    @GetMapping("/facture/{idUser}")
    public List<FactureSendDTO> getFactureByIdUser(@PathVariable String idUser){
        List<Facture> factureList = service.getFactureByIdUser(idUser);
        return factureMapper.mappListDTO(factureList);
    }

}

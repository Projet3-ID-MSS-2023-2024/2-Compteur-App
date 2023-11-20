package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.exception.ResourceNotFoundException;
import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.model.FactureStatement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import com.compteurapp.backendcompteurapp.services.CompteurDataService;


import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
public class CompteurDataController {


    /**/
    /* METHODE POUR LE CLIENT"
    /**/

    @Autowired
    CompteurDataService service;

    @PostMapping("/createCompteurData")
    public CompteurData createCompteurData(@Validated @RequestBody CompteurData compteurData) {
        return service.createCompteurData(compteurData);
    }

    /**/
    /* METHODE POUR LE VENDEUR */
    /**/

    /* On récupere tout les relevés d'un client */

    @GetMapping("/getCompteurDataByClientId/{idClient}/{start}/{end}")
    public List<CompteurData> getCompteurDataByClientId(@PathVariable Long idClient, @PathVariable int start, @PathVariable int end){
        return service.getCompteurDataByClientId(idClient, start, end);
    }

    /* On récupere les CompteurData pour les relevés pas encore traiter */

    @GetMapping("/getCompteurDataByVendeurIdWithoutFacture/{idVendeur}/{start}/{end}")
    public List<CompteurData> getCompteurDataByVendeurIdWithoutFacture(@PathVariable Long idVendeur, @PathVariable int start, @PathVariable int end){
        return service.getCompteurDataByVendeurIdWithoutFacture(idVendeur, start,end);
    }


    /* On récupere les CompteurData d'un client qui ne sont pas traité */

    @GetMapping("/getCompteurDataByVendeurIdAndClientIdWithoutFacture/{id_Vendeur}/{idClient}/{start}/{end}")
    public List<CompteurData> getCompteurDataByVendeurIdAndClientIdWithoutFacture(@PathVariable Long idVendeur, @PathVariable Long idClient, @PathVariable int start, @PathVariable int end){
        return service.getCompteurDataByVendeurIdAndClientIdWithoutFacture(idVendeur, idClient, start, end);
    }

    /* On récupere les CompteurData ou les factures en fonction d'un état */

    @GetMapping("/getCompteurDataByVendeurIdAndFactureEtat/{idVendeur}/{etat}/{start}/{end}")
    public List<CompteurData> getCompteurDataByVendeurIdAndFactureEtat(@PathVariable Long idVendeur, @PathVariable FactureStatement etat, @PathVariable int start, @PathVariable int end){
        return service.getCompteurDataByVendeurIdAndFactureEtat(idVendeur, etat, start, end);
    }


    /* On récupere les CompteurData ou les factures sont impayé ou payé pour un client */

    @GetMapping("/getCompteurDataByVendeurIdAndClientIdAndFactureEtat/{idVendeur}/{idClient}/{etat}/{start}/{end}")
    public List<CompteurData> getCompteurDataByVendeurIdAndClientIdAndFactureEtat(@PathVariable Long idVendeur, @PathVariable Long idClient, @PathVariable FactureStatement etat, @PathVariable int start, @PathVariable int end){
        return service.getCompteurDataByVendeurIdAndClientIdAndFactureEtat(idVendeur, idClient, etat, start, end);
    }

}

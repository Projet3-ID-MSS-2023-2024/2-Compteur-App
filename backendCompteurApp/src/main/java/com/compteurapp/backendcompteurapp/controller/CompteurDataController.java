package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.exception.ResourceNotFoundException;
import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.model.FactureStatement;
import com.compteurapp.backendcompteurapp.repository.CompteurDataRepository;
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


import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
public class CompteurDataController {

    @Autowired
    CompteurDataRepository repository;

    /**/
    /* METHODE POUR LE CLIENT"
    /**/

    @PostMapping("/createCompteurData")
    public CompteurData createCompteurData(@Validated @RequestBody CompteurData compteurData) {
        return repository.save(compteurData);
    }

    /**/
    /* METHODE POUR LE VENDEUR */
    /**/

    /* On récupere tout les relevés d'un client */

    @GetMapping("/getCompteurDataByClientId/{idClient}/{start}/{end}")
    public List<CompteurData> getCompteurDataByClientId(@PathVariable int idClient, @PathVariable int start, @PathVariable int end){
        Pageable pageable = PageRequest.of(start, end);
        Long idClientLong = Long.valueOf(idClient);
        Page<CompteurData> page = repository.findByClient(idClientLong, pageable);
        if (page.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with client id " + idClient);
        }
        return page.getContent();
    }





    /* On récupere les CompteurData pour les relevés pas encore traiter */

    @GetMapping("/getCompteurDataByVendeurIdWithoutFacture/{idVendeur}/{start}/{end}")
    public List<CompteurData> getCompteurDataByVendeurIdWithoutFacture(@PathVariable int idVendeur, @PathVariable int start, @PathVariable int end){
        Pageable pageable = PageRequest.of(start, end);
        Long idVendeurLong = Long.valueOf(idVendeur);
        Page<CompteurData> page = repository.findByVendeurAndFacturesIsNull(idVendeurLong, pageable);
        if (page.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with vendeur id " + idVendeurLong + " without Facture");
        }
        return page.getContent();
    }


    /* On récupere les CompteurData d'un client qui ne sont pas traité */

    @GetMapping("/getCompteurDataByVendeurIdAndClientIdWithoutFacture/{id_Vendeur}/{idClient}/{start}/{end}")
    public List<CompteurData> getCompteurDataByVendeurIdAndClientIdWithoutFacture(@PathVariable Long idVendeur, @PathVariable Long idClient, @PathVariable int start, @PathVariable int end){
        Pageable pageable = PageRequest.of(start, end);
        Page<CompteurData> page = repository.findByVendeurAndClientAndFacturesIsNull(idVendeur, idClient, pageable);
        if (page.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with vendeur id " + idVendeur + " and client id " + idClient + " without Facture");
        }
        return page.getContent();
    }

    /* On récupere les CompteurData ou les factures en fonction d'un état */
    @GetMapping("/getCompteurDataByVendeurIdAndFactureEtat/{idVendeur}/{etat}/{start}/{end}")
    public List<CompteurData> getCompteurDataByVendeurIdAndFactureEtat(@PathVariable Long idVendeur, @PathVariable FactureStatement etat, @PathVariable int start, @PathVariable int end){
        Pageable pageable = PageRequest.of(start, end);
        Page<CompteurData> page = repository.findByVendeurAndFacturesEtat(idVendeur, etat, pageable);
        if (page.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with vendeur id " + idVendeur + " and Facture etat " + etat);
        }
        return page.getContent();
    }


    /* On récupere les CompteurData ou les factures sont impayé ou payé pour un client */
    @GetMapping("/getCompteurDataByVendeurIdAndClientIdAndFactureEtat/{idVendeur}/{idClient}/{etat}/{start}/{end}")
    public List<CompteurData> getCompteurDataByVendeurIdAndClientIdAndFactureEtat(@PathVariable Long idVendeur, @PathVariable Long idClient, @PathVariable FactureStatement etat, @PathVariable int start, @PathVariable int end){
        Pageable pageable = PageRequest.of(start, end);
        Page<CompteurData> page = repository.findByVendeurAndClientAndFacturesEtat(idVendeur, idClient, etat, pageable);
        if (page.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with vendeur id " + idVendeur + ", client id " + idClient + " and Facture etat " + etat);
        }
        return page.getContent();
    }
}

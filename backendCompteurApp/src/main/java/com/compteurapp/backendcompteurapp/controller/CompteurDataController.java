package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.exception.ResourceNotFoundException;
import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.model.FactureStatement;
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


    /**/
    /* METHODE POUR LE CLIENT"
    /**/

    @PostMapping("/createCompteurData")
    public CompteurData createCompteurData(@Valid @RequestBody CompteurData compteurData) {
        return repository.save(compteurData);
    }


    /**/
    /* METHODE POUR LE VENDEUR */
    /**/

    /* On récupere tout les relevés d'un client */
    @GetMapping("/getCompteurDataByClientId/{idClient}")
    public List<CompteurData> getCompteurDataByClientId(@PathVariable Long idClient) {
        List<CompteurData> compteurDataList = repository.findByIdClient(idClient);
        if (compteurDataList.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with client id " + idClient);
        }
        return compteurDataList;
    }

    /* On récupere les CompteurData pour les relevés pas encore traiter */
    @GetMapping("/getCompteurDataByVendeurIdWithoutFacture/{idVendeur}")
    public List<CompteurData> getCompteurDataByVendeurIdWithoutFacture(@PathVariable Long idVendeur){
        List<CompteurData> compteurDataList = repository.findByIdVendeurAndFacturesIsNull(idVendeur);
        if (compteurDataList.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with vendeur id " + idVendeur + " without Facture");
        }
        return compteurDataList;
    }

    /* On récupere les CompteurData d'un client qui ne sont pas traité */
    @GetMapping("/getCompteurDataByVendeurIdAndClientIdWithoutFacture/{idVendeur}/{idClient}")
    public List<CompteurData> getCompteurDataByVendeurIdAndClientIdWithoutFacture(@PathVariable Long idVendeur, @PathVariable Long idClient){
        List<CompteurData> compteurDataList = repository.findByIdVendeurAndIdClientAndFacturesIsNull(idVendeur, idClient);
        if (compteurDataList.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with vendeur id " + idVendeur + " and client id " + idClient + " without Facture");
        }
        return compteurDataList;
    }

    /* On récupere les CompteurData ou les factures sont impayé */
    @GetMapping("/getCompteurDataByVendeurIdAndFactureEtat/{idVendeur}")
    public List<CompteurData> getCompteurDataByVendeurIdAndFactureEtat(@PathVariable Long idVendeur){
        List<CompteurData> compteurDataList = repository.findByIdVendeurAndFacturesEtat(idVendeur, FactureStatement.IMPAYER);
        if (compteurDataList.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with vendeur id " + idVendeur + " and Facture etat IMPAYER");
        }
        return compteurDataList;
    }





}

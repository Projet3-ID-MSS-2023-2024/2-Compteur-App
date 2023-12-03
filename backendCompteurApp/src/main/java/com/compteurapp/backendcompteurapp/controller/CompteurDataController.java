package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.DTO.CompteurDataSenderDTO;
import com.compteurapp.backendcompteurapp.exception.ResourceNotFoundException;
import com.compteurapp.backendcompteurapp.mapper.CompteurDataMapper;
import com.compteurapp.backendcompteurapp.model.Compteur;
import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.model.FactureStatement;
import jakarta.validation.Valid;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import com.compteurapp.backendcompteurapp.services.CompteurDataService;
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
public class CompteurDataController {


    /**/
    /* METHODE POUR LE CLIENT"
    /**/

    @Autowired
    CompteurDataService service;

    @Autowired
    CompteurDataMapper compteurDataMapper;

    @PostMapping("/createCompteurData")
    public CompteurDataSenderDTO createCompteurData(@RequestParam("image") MultipartFile image,
                                                    @RequestParam String client,
                                                    @RequestParam String vendeur,
                                                    @RequestParam double valeur,
                                                    @RequestParam Long idCompteur,
                                                    @RequestParam String rue,
                                                    @RequestParam String numeros,
                                                    @RequestParam String codePostal,
                                                    @RequestParam String ville,
                                                    @RequestParam String pays) throws IOException, IOException {
       return compteurDataMapper.createCompteurData(image, client, vendeur, valeur, idCompteur, rue, numeros, codePostal, ville, pays);
    }



    /**/
    /* METHODE POUR LE VENDEUR */
    /**/

    /* On récupere tout les relevés d'un client */

    @GetMapping("/getCompteurDataByClientId/{idClient}/{start}/{end}")
    public List<CompteurDataSenderDTO> getCompteurDataByClientId(@PathVariable String idClient, @PathVariable int start, @PathVariable int end){
        return compteurDataMapper.mappingCompteurDataByClientId(idClient, start, end);
    }

    /* On récupere les CompteurData pour les relevés pas encore traiter */

    @GetMapping("/getCompteurDataByVendeurIdWithoutFacture/{idVendeur}/{start}/{end}")
    public List<CompteurDataSenderDTO> getCompteurDataByVendeurIdWithoutFacture(@PathVariable String idVendeur, @PathVariable int start, @PathVariable int end){
        return compteurDataMapper.mappingCompteurDataByVendeurIdWithoutFacture(idVendeur, start, end);
    }


    /* On récupere les CompteurData d'un client qui ne sont pas traité */

    @GetMapping("/getCompteurDataByVendeurIdAndClientIdWithoutFacture/{id_Vendeur}/{idClient}/{start}/{end}")
    public List<CompteurDataSenderDTO> getCompteurDataByVendeurIdAndClientIdWithoutFacture(@PathVariable String idVendeur, @PathVariable String idClient, @PathVariable int start, @PathVariable int end){
        return compteurDataMapper.mappingCompteurDataByVendeurIdAndClientIdWithoutFacture(idVendeur, idClient, start, end);
    }

    /* On récupere les CompteurData ou les factures en fonction d'un état */

    @GetMapping("/getCompteurDataByVendeurIdAndFactureEtat/{idVendeur}/{etat}/{start}/{end}")
    public List<CompteurDataSenderDTO> getCompteurDataByVendeurIdAndFactureEtat(@PathVariable String idVendeur, @PathVariable FactureStatement etat, @PathVariable int start, @PathVariable int end){
        return compteurDataMapper.mappingCompteurDataByVendeurIdAndFactureEtat(idVendeur, etat, start, end);
    }


    /* On récupere les CompteurData ou les factures sont impayé ou payé pour un client */

    @GetMapping("/getCompteurDataByVendeurIdAndClientIdAndFactureEtat/{idVendeur}/{idClient}/{etat}/{start}/{end}")
    public List<CompteurDataSenderDTO> getCompteurDataByVendeurIdAndClientIdAndFactureEtat(@PathVariable String idVendeur, @PathVariable String idClient, @PathVariable FactureStatement etat, @PathVariable int start, @PathVariable int end){
        return compteurDataMapper.mappingCompteurDataByVendeurIdAndClientIdAndFactureEtat(idVendeur, idClient, etat, start, end);
    }

}

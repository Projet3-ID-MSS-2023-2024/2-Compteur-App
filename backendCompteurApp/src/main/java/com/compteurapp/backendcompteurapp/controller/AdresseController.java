package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.model.Adresse;
import com.compteurapp.backendcompteurapp.repository.AdresseRepository;
import com.compteurapp.backendcompteurapp.services.AdresseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class AdresseController {

    @Autowired
    private AdresseService adresseService;


    @PostMapping("/addAdresse")
    public Adresse addAdresse(@RequestBody Adresse adresse){
        return adresseService.addAdresse(adresse);
    }

    @PutMapping("/updateAdresse")
    public Adresse updateAdresse(@RequestBody Adresse adresse) throws Exception {
       return adresseService.updateAdresse(adresse);
    }

    @GetMapping("/getAdresseByUsername/{username}")
    public Adresse getAdresseByUsername(@PathVariable String username){ return adresseService.getAdresseByUserName(username);}

    @GetMapping("/getAdresses")
    public List<Adresse> getAdresses(){ return adresseService.getAdresses();}
}

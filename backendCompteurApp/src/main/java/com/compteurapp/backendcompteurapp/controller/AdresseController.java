package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.model.Adresse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.compteurapp.backendcompteurapp.services.AdresseService;



@RestController
@RequestMapping("/api")
public class AdresseController {

    @Autowired
    AdresseService adresseService;

    @GetMapping("/getAdresses")
    public List<Adresse> getAdresses(){
        return adresseService.getAdresses();
    }


    @PostMapping("/addAdresse")
    public Adresse addAdresse(@RequestBody Adresse adresse){
        return adresseService.addAdresse(adresse);
    }

    @PutMapping
    public void updateAdresse(@RequestBody Adresse adresse) throws Exception { adresseService.updateAdresse(adresse); }

    @DeleteMapping
    public void delete(@RequestParam long id){ adresseService.delete(id); }

    @GetMapping
    public Adresse getAdresseById(@RequestParam long id){ return adresseService.getAdresseById(id).get();}
}

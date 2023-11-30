package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.model.Adresse;
import com.compteurapp.backendcompteurapp.repository.AdresseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class AdresseController {

    @Autowired
    AdresseRepository repository;

    @GetMapping("/getAdresses")
    public List<Adresse> getAdresses(){
        return repository.findAll();
    }


    @PostMapping("/addAdresse")
    public Adresse addAdresse(@RequestBody Adresse adresse){
        return repository.save(adresse);
    }

    @PutMapping
    public Adresse updateAdresse(@RequestBody Adresse adresse) throws Exception {
        if(adresse.getId() <= 0){
            throw new Exception("No id provided");
        }
        return repository.save(adresse);
    }

    @DeleteMapping
    public void delete(@RequestParam long id){
        repository.deleteById(id);
    }
}

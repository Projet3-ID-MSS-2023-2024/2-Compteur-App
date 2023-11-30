package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.model.Compteur;
import com.compteurapp.backendcompteurapp.repository.CompteurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;


@Service
public class CompteurService {
    @Autowired
    CompteurRepository repository;

    public Compteur createCompteur(Compteur compteur){
        return repository.save(compteur);
    }

    public List<Compteur> findCompteurByIdUser(String id){ return repository.findByUserKeycloack(id); }

    public boolean deleteById(Long id){
        this.repository.deleteById(id);
        Optional<Compteur> compteur = this.repository.findById(id);
        return compteur.isEmpty();
    }

    public Optional<Compteur> getOneCompteur(Long id){
        return repository.findById(id);
    }


}

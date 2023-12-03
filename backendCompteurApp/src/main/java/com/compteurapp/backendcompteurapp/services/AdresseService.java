package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.model.Adresse;
import com.compteurapp.backendcompteurapp.repository.AdresseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdresseService {

    @Autowired
    private AdresseRepository adresseRepository;

    public List<Adresse> getAdresses(){ return adresseRepository.findAll(); }

    public Adresse addAdresse(Adresse adresse){
        return adresseRepository.save(adresse);
    }

    public void updateAdresse(Adresse adresse) throws Exception {
        if(adresse.getId() <= 0){
            throw new Exception("No id provided");
        }
        adresseRepository.save(adresse);
    }

    public void delete(long id){
        adresseRepository.deleteById(id);
    }

    public Optional<Adresse> getAdresseById(long id){ return adresseRepository.findById(id);}
}

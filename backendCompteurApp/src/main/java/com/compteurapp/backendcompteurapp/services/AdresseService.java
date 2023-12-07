package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.repository.AdresseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.compteurapp.backendcompteurapp.model.Adresse;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class AdresseService {

    @Autowired
    AdresseRepository adresseRepository;

    public Adresse getAdresseByUserName(String username){ return adresseRepository.findAddressByUsername(username);}

    public Adresse addAdresse(Adresse adresse){
        return adresseRepository.save(adresse);
    }

    public Adresse updateAdresse(Adresse adresse) throws Exception {
        if(adresse.getId() <= 0){
            throw new Exception("No id provided");
        }
        return adresseRepository.save(adresse);
    }
    public List<Adresse> getAdresses(){
        return adresseRepository.findAll();
    }
}

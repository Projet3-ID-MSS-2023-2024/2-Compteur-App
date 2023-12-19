package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.model.AdresseDTO;
import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.repository.AdresseRepository;
import com.compteurapp.backendcompteurapp.repository.UserDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.compteurapp.backendcompteurapp.model.Adresse;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class AdresseService {

    @Autowired
    AdresseRepository adresseRepository;

    @Autowired
    UserDBRepository userDBRepository;

    public Adresse getAdresseByUserName(String username){ return adresseRepository.findAdresseByUserUsername(username);}

    public Adresse getAdresseByUserId(String id){ return adresseRepository.findAdresseByUserId(id);}

    public Adresse addAdresse(Adresse adresse){
        return adresseRepository.save(adresse);
    }

    public Adresse updateAdresse(AdresseDTO adresse) throws Exception {
        Adresse adresseCree = new Adresse();
        adresseCree.setRue(adresse.getRue());
        adresseCree.setVille(adresse.getVille());
        adresseCree.setPays(adresse.getPays());
        adresseCree.setCodePostal(adresse.getCodePostal());
        adresseCree.setNumero(adresse.getNumero());

        if(adresse.getId() == null){
            adresseCree = adresseRepository.save(adresseCree);
            UserDB user = userDBRepository.findById(adresse.getIdClient()).get();
            user.setAdresse(adresseCree);
            userDBRepository.save(user);
            return adresseCree;
        }
        if(adresse.getId() <= 0){
            throw new Exception("No id provided");
        }
        adresseCree.setId(adresse.getId());
        return adresseRepository.save(adresseCree);
    }
    public List<Adresse> getAdresses(){
        return adresseRepository.findAll();
    }
}

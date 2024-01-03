package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.DTO.AdresseDTO;
import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.repository.AdresseRepository;
import com.compteurapp.backendcompteurapp.repository.UserDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.compteurapp.backendcompteurapp.model.Adresse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdresseService {

    @Autowired
    AdresseRepository adresseRepository;

    @Autowired
    UserDBRepository userDBRepository;

    public Adresse getAdresseByUserName(String username){ return adresseRepository.findAdresseByUserUsername(username);}

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

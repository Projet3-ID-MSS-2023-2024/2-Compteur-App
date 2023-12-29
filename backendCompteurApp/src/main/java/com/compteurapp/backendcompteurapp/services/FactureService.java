package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.model.Facture;
import com.compteurapp.backendcompteurapp.enums.FactureStatement;
import com.compteurapp.backendcompteurapp.repository.FactureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FactureService {

    @Autowired
    FactureRepository repository;

    public Facture createFacture(Facture facture){
        CompteurData compteurData = new CompteurData();
        compteurData.setId(facture.getCompteurData().getId());
        facture.setCompteurData(compteurData);
        return repository.save(facture);
    }

    public List<Facture> getFactureByIdUser(String idUser, FactureStatement state){
        return repository.findByCompteurData_Client_IdAndEtat(idUser, state);
    }

    public Facture updateStatus(Long factureId,FactureStatement state){
        Facture facture = repository.findById(factureId).get();
        facture.setEtat(state);
        return repository.save(facture);
    }
}

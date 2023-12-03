package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.model.Facture;
import com.compteurapp.backendcompteurapp.repository.FactureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}

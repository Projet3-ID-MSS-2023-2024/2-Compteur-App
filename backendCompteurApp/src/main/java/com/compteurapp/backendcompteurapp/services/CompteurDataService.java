package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.repository.CompteurDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompteurDataService {

    @Autowired
    CompteurDataRepository repository;

    public CompteurData createCompteurData(CompteurData compteurData){
        return repository.save(compteurData);
    }
}

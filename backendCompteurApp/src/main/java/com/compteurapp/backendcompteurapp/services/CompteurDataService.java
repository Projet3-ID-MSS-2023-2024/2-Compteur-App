package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.exception.ResourceNotFoundException;
import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.model.FactureStatement;
import com.compteurapp.backendcompteurapp.repository.CompteurDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class CompteurDataService {

    @Autowired
    CompteurDataRepository repository;

    public CompteurData createCompteurData(CompteurData compteurData){
        return repository.save(compteurData);
    }

    public List<CompteurData> getCompteurDataByClientId(String idClient, int start, int end){
        Pageable pageable = PageRequest.of(start, end);
        Page<CompteurData> page = repository.findByClient(idClient, pageable);
        if (page.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with client id " + idClient);
        }
        return page.getContent();
    }

    public List<CompteurData> getCompteurDataByVendeurIdWithoutFacture(String idVendeur, int start, int end){
        Pageable pageable = PageRequest.of(start, end);
        Page<CompteurData> page = repository.findByProviderAndFacturesIsNull(idVendeur, pageable);
        if (page.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with vendeur id " + idVendeur + " without Facture");
        }
        return page.getContent();
    }

    public List<CompteurData> getCompteurDataByVendeurIdAndClientIdWithoutFacture(String idVendeur, String idClient,int start, int end){
        Pageable pageable = PageRequest.of(start, end);
        Page<CompteurData> page = repository.findByProviderAndClientAndFacturesIsNull(idVendeur, idClient, pageable);
        if (page.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with vendeur id " + idVendeur + " and client id " + idClient + " without Facture");
        }
        return page.getContent();
    }

    public List<CompteurData> getCompteurDataByVendeurIdAndFactureEtat(String idVendeur, FactureStatement etat, int start, int end){
        Pageable pageable = PageRequest.of(start, end);
        Page<CompteurData> page = repository.findByProviderAndFacturesEtat(idVendeur, etat, pageable);
        if (page.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with vendeur id " + idVendeur + " and Facture etat " + etat);
        }
        return page.getContent();
    }

    public List<CompteurData> getCompteurDataByVendeurIdAndClientIdAndFactureEtat(String idVendeur, String idClient, FactureStatement etat, int start, int end){
        Pageable pageable = PageRequest.of(start, end);
        Page<CompteurData> page = repository.findByProviderAndClientAndFacturesEtat(idVendeur, idClient, etat, pageable);
        if (page.isEmpty()) {
            throw new ResourceNotFoundException("No CompteurData found with vendeur id " + idVendeur + ", client id " + idClient + " and Facture etat " + etat);
        }
        return page.getContent();
    }

}

package com.compteurapp.backendcompteurapp.mapper;

import com.compteurapp.backendcompteurapp.DTO.FactureDTO;
import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.model.Facture;
import com.compteurapp.backendcompteurapp.services.FactureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FactureMapper {

    @Autowired
    private FactureService factureService;

    public Facture createFacture(FactureDTO factureDTO){
        Facture facture = new Facture();
        CompteurData compteurData = new CompteurData();
        compteurData.setId(factureDTO.idCompteurData);
        facture.setPrix(factureDTO.prix);
        facture.setEtat(factureDTO.etat);
        facture.setCompteurData(compteurData);
        facture = factureService.createFacture(facture);
        return facture;
    }
}

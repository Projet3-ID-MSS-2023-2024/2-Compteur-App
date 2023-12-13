package com.compteurapp.backendcompteurapp.mapper;

import com.compteurapp.backendcompteurapp.DTO.FactureDTO;
import com.compteurapp.backendcompteurapp.DTO.FactureSendDTO;
import com.compteurapp.backendcompteurapp.DTO.FactureUpdateDTO;
import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.model.Facture;
import com.compteurapp.backendcompteurapp.model.FactureStatement;
import com.compteurapp.backendcompteurapp.services.FactureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

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

    public List<FactureSendDTO> mappListDTO(List<Facture> factureList){
        List<FactureSendDTO> factureSendDTOList = new ArrayList<>();
        for(Facture facture : factureList){
            factureSendDTOList.add(mappFactureDTO(facture));
        }
        return factureSendDTOList;
    }

    public FactureSendDTO mappFactureDTO(Facture facture){
        FactureSendDTO factureSendDTO = new FactureSendDTO();
        factureSendDTO.id = facture.getId();
        factureSendDTO.prix = facture.getPrix();
        factureSendDTO.etat = facture.getEtat();
        factureSendDTO.nomCompteur = facture.getCompteurData().getCompteur().getNom();
        factureSendDTO.nomClient = facture.getCompteurData().getClient().getFirstname();
        factureSendDTO.nomProvideur = facture.getCompteurData().getProvider().getFirstname();
        factureSendDTO.date = facture.getCompteurData().getDate();
        factureSendDTO.TVA = facture.getCompteurData().getProvider().getTva();
        return factureSendDTO;
    }

    public List<Facture> getFactureByIdUser(String idUser, FactureStatement state){
        return factureService.getFactureByIdUser(idUser, state);
    }

}

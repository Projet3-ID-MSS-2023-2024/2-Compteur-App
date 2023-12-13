package com.compteurapp.backendcompteurapp.DTO;

import com.compteurapp.backendcompteurapp.model.FactureStatement;

import java.util.Date;

public class FactureSendDTO {
    public Long id;
    public double prix;
    public FactureStatement etat;
    public String nomCompteur;
    public String nomClient;
    public String nomProvideur;
    public Date date;
    public String TVA;

}

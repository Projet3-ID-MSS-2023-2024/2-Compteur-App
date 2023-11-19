package com.compteurapp.backendcompteurapp.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "facture")
public class Facture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Date date;
    private double prix;
    private FactureStatement etat;

    @ManyToOne
    @JoinColumn(name="compteur_data_id")
    private CompteurData compteurData;

}

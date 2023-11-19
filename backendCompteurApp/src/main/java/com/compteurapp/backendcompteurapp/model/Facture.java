package com.compteurapp.backendcompteurapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

@Entity
@Table(name = "facture")
public class Facture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotNull
    private Date date;
    @Min(value = 0)
    private double prix;
    @Enumerated(EnumType.STRING)
    private FactureStatement etat;

    @ManyToOne
    @JoinColumn(name="compteur_data_id")
    private CompteurData compteurData;

    public Facture(long id, Date date, double prix, FactureStatement etat, CompteurData compteurData) {
        this.id = id;
        this.date = date;
        this.prix = prix;
        this.etat = etat;
        this.compteurData = compteurData;
    }

    public Facture(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public FactureStatement getEtat() {
        return etat;
    }

    public void setEtat(FactureStatement etat) {
        this.etat = etat;
    }

    public CompteurData getCompteurData() {
        return compteurData;
    }

    public void setCompteurData(CompteurData compteurData) {
        this.compteurData = compteurData;
    }
}

package com.compteurapp.backendcompteurapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


import java.sql.Date;

@Entity
@Table(name = "compteur_data")
public class CompteurData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private Date date;

    @Min(0)
    private double valeur;

    @Size(max = 255)
    private String photo;

    @NotNull
    private long id_client;

    @NotNull
    private long id_vendeur;

    @ManyToOne
    @JoinColumn(name="id_compteur")
    private Compteur compteur;


    public CompteurData(long id, Date date, double valeur, String photo, long id_client, long id_vendeur, Compteur compteur) {
        this.id = id;
        this.date = date;
        this.valeur = valeur;
        this.photo = photo;
        this.id_client = id_client;
        this.id_vendeur = id_vendeur;
        this.compteur = compteur;
    }

    public CompteurData(){}

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

    public double getValeur() {
        return valeur;
    }

    public void setValeur(double valeur) {
        this.valeur = valeur;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public long getId_client() {
        return id_client;
    }

    public void setId_client(long id_client) {
        this.id_client = id_client;
    }

    public long getId_vendeur() {
        return id_vendeur;
    }

    public void setId_vendeur(long id_vendeur) {
        this.id_vendeur = id_vendeur;
    }

    public Compteur getCompteur() {
        return compteur;
    }

    public void setCompteur(Compteur compteur) {
        this.compteur = compteur;
    }
}

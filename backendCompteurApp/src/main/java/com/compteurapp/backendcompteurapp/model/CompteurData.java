package com.compteurapp.backendcompteurapp.model;

import jakarta.persistence.*;
import org.apache.james.mime4j.dom.datetime.DateTime;

import java.sql.Date;

@Entity
@Table(name = "compteur_data")
public class CompteurData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Date date;
    private double valeur;
    private String photo;

    @ManyToOne
    @JoinColumn(name="id_compteur")
    private Compteur compteur;

    public CompteurData(long id, Date date, double valeur, String photo, Compteur compteur) {
        this.id = id;
        this.date = date;
        this.valeur = valeur;
        this.photo = photo;
        this.compteur = compteur;
    }

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

    public Compteur getCompteur() {
        return compteur;
    }

    public void setCompteur(Compteur compteur) {
        this.compteur = compteur;
    }
}

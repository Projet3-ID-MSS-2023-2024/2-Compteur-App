package com.compteurapp.backendcompteurapp.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "compteur")
public class Compteur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;

    private String id_user;

    private String id_fournisseur;

    @ManyToOne
    @JoinColumn(name="adresse_id", nullable=false)
    private Adresse adresse;

    @ManyToOne
    @JoinColumn(name="categorie_id", nullable=false)
    private Category category;


    public Compteur(Long id, String nom, String id_user, String id_fournisseur, Adresse adresse, Category category) {
        this.id = id;
        this.nom = nom;
        this.id_user = id_user;
        this.id_fournisseur = id_fournisseur;
        this.adresse = adresse;
        this.category = category;
    }

    public Compteur(){}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getId_user() {
        return id_user;
    }

    public void setId_user(String id_user) {
        this.id_user = id_user;
    }

    public String getId_fournisseur() {
        return id_fournisseur;
    }

    public void setId_fournisseur(String id_fournisseur) {
        this.id_fournisseur = id_fournisseur;
    }

    public Adresse getAdresse() {
        return adresse;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}

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

    private String userKeycloack;

    private String fournisseurKeycloack;

    @ManyToOne
    @JoinColumn(name="adresse_id", nullable=false)
    private Adresse adresse;

    @ManyToOne
    @JoinColumn(name="categorie_id", nullable=false)
    private Category category;


    public Compteur(Long id, String nom, String user, String fournisseur, Adresse adresse, Category category) {
        this.id = id;
        this.nom = nom;
        this.userKeycloack = user;
        this.fournisseurKeycloack = fournisseur;
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

    public String getUser() {
        return userKeycloack;
    }

    public void setUser(String user) {
        this.userKeycloack = user;
    }

    public String getFournisseur() {
        return fournisseurKeycloack;
    }

    public void setFournisseur(String fournisseur) {
        this.fournisseurKeycloack = fournisseur;
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

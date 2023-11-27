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

    @OneToMany(mappedBy = "compteur", cascade = CascadeType.ALL)
    private List<CompteurData> compteurData;

    private Long id_user;

    @ManyToOne
    @JoinColumn(name="adresse_id", nullable=false)
    private Adresse adresse;

    @ManyToOne
    @JoinColumn(name="categorie_id", nullable=false)
    private Category category;


    public Compteur(Long id, String nom, List<CompteurData> compteurData, Long id_user, Adresse adresse, Category category) {
        this.id = id;
        this.nom = nom;
        this.compteurData = compteurData;
        this.id_user = id_user;
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

    public List<CompteurData> getCompteurData() {
        return compteurData;
    }

    public void setCompteurData(List<CompteurData> compteurData) {
        this.compteurData = compteurData;
    }

    public Long getId_user() {
        return id_user;
    }

    public void setId_user(Long id_user) {
        this.id_user = id_user;
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

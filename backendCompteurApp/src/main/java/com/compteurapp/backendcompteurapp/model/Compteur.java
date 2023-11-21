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

    public Compteur(Long id, String nom, List<CompteurData> compteurData) {
        this.id = id;
        this.nom = nom;
        this.compteurData = compteurData;
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
}

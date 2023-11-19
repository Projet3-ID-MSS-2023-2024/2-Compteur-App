package com.compteurapp.backendcompteurapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "compteur_datas")
public class CompteurData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Date date;

    @Min(0)
    private Double valeur;

    @Size(max = 255)
    private String photo;

    @NotNull
    private Long client;

    @NotNull
    private Long vendeur;

    @ManyToOne
    @JoinColumn(name="id_compteur")
    private Compteur compteur;

    @OneToMany(mappedBy = "compteurData")
    private List<Facture> factures;

    public CompteurData(Date date, Double valeur, String photo, Long client, Long vendeur, Compteur compteur, List<Facture> factures) {
        this.date = date;
        this.valeur = valeur;
        this.photo = photo;
        this.client = client;
        this.vendeur = vendeur;
        this.compteur = compteur;
        this.factures = factures;
    }

    public CompteurData(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Double getValeur() {
        return valeur;
    }

    public void setValeur(Double valeur) {
        this.valeur = valeur;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Long getClient() {
        return client;
    }

    public void setClient(Long client) {
        this.client = client;
    }

    public Long getVendeur() {
        return vendeur;
    }

    public void setVendeur(Long vendeur) {
        this.vendeur = vendeur;
    }

    public Compteur getCompteur() {
        return compteur;
    }

    public void setCompteur(Compteur compteur) {
        this.compteur = compteur;
    }

    public List<Facture> getFactures() {
        return factures;
    }

    public void setFactures(List<Facture> factures) {
        this.factures = factures;
    }
}

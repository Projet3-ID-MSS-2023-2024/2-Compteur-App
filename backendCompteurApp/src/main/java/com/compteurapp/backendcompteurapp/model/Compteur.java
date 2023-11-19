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
}

package com.compteurapp.backendcompteurapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "compteur")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Compteur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;

    @ManyToOne
    @JoinColumn(name="client_id", nullable=false)
    private UserDB client;

    @ManyToOne
    @JoinColumn(name="provider_id", nullable=false)
    private UserDB provider;

    @ManyToOne
    @JoinColumn(name="adresse_id", nullable=false)
    private Adresse adresse;

    @ManyToOne
    @JoinColumn(name="categorie_id", nullable=false)
    private Category category;



}

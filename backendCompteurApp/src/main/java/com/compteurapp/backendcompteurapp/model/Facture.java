package com.compteurapp.backendcompteurapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "facture")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Facture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Date date = new Date(System.currentTimeMillis());

    @Min(value = 0)
    private double prix;

    @Enumerated(EnumType.STRING)
    private FactureStatement etat;

    @ManyToOne
    @JoinColumn(name = "compteurData", nullable = false)
    @JsonIgnore
    private CompteurData compteurData;

}

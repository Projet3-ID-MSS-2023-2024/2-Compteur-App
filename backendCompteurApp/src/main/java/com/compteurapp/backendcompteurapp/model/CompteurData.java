package com.compteurapp.backendcompteurapp.model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.Type;
import org.springframework.validation.annotation.Validated;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "compteur_data")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompteurData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date = new Date();

    @DecimalMin("0.0")
    @Valid
    private Double valeur;

    @Size(max = 255)
    private String photo;

    @ManyToOne
    @JoinColumn(name="client_id", nullable=false)
    private UserDB client;

    @ManyToOne
    @JoinColumn(name="provider_id", nullable=false)
    private UserDB provider;

    @ManyToOne
    @JoinColumn(name="id_compteur")
    private Compteur compteur;


}

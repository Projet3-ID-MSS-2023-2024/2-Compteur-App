package com.compteurapp.backendcompteurapp.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdresseDTO {
    private Long id;
    private String rue;
    private String numero;
    private String codePostal;
    private String ville;
    private String pays;
    private String idClient;

    public AdresseDTO(String rue, String numero, String codePostal, String ville, String pays,String idClient) {
        this.rue = rue;
        this.numero = numero;
        this.codePostal = codePostal;
        this.ville = ville;
        this.pays = pays;
        this.idClient = idClient;
    }
}



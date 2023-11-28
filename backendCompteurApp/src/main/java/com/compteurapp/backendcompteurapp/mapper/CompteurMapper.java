package com.compteurapp.backendcompteurapp.mapper;

import com.compteurapp.backendcompteurapp.DTO.CompteurDto;
import com.compteurapp.backendcompteurapp.DTO.CompteurSenderDTO;
import com.compteurapp.backendcompteurapp.model.Adresse;
import com.compteurapp.backendcompteurapp.model.Category;
import com.compteurapp.backendcompteurapp.model.Compteur;
import com.compteurapp.backendcompteurapp.model.Provider;
import com.compteurapp.backendcompteurapp.repository.CategoryRepository;
import com.compteurapp.backendcompteurapp.services.CompteurService;
import com.compteurapp.backendcompteurapp.services.KeycloakService;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

@Component
public class CompteurMapper {

    @Autowired
    CompteurService service;
    @Autowired
    KeycloakService keycloakService;

    public CompteurSenderDTO createCompteurMapping(CompteurDto compteurDto){
        Compteur compteur;
        compteur = mappingNewCompteur(compteurDto);
        compteur = service.createCompteur(compteur);
        CompteurSenderDTO compteurSenderDTO = mappingSenderDto(compteur);
        return compteurSenderDTO;
    }

    public Compteur mappingNewCompteur(CompteurDto compteurDto){
        Adresse adresse = new Adresse();
        adresse.setId(compteurDto.id_adresse);

        Category category = new Category();
        category.setId(compteurDto.id_category);

        Compteur compteur = new Compteur();
        compteur.setNom(compteurDto.nom);
        compteur.setCategory(category);
        compteur.setAdresse(adresse);
        compteur.setId_fournisseur(compteurDto.id_fournisseur);
        compteur.setId_user(compteurDto.id_user);
        return compteur;
    }

    public CompteurSenderDTO mappingSenderDto(Compteur compteur){
        List<Provider> providerList = keycloakService.getProviders();
        UserRepresentation userRepresentation = keycloakService.getUserById(compteur.getId_user());
        CompteurSenderDTO compteurSenderDTO = new CompteurSenderDTO();
        compteurSenderDTO.id = compteur.getId();
        compteurSenderDTO.nom = compteur.getCategory().getName();
        compteurSenderDTO.nom_user = userRepresentation.getFirstName();
        compteurSenderDTO.nom_category = compteur.getCategory().getName();

        Optional<Provider> providerWithSpecialID = providerList.stream().filter(provider -> provider.getId()
                .equals(compteur.getId_fournisseur()))
                .findFirst();

        if(providerWithSpecialID.isPresent()){
            compteurSenderDTO.nom_fournisseur = providerWithSpecialID.get().getFirstName();
        }

        return compteurSenderDTO;

    }
}

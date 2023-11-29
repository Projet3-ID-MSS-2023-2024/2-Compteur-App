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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

@Component
public class CompteurMapper {

    @Autowired
    CompteurService service;
    @Autowired
    KeycloakService keycloakService;

    @Autowired
    CategoryRepository categoryRepository;

    public CompteurSenderDTO createCompteurMapping(CompteurDto compteurDto){
        Compteur compteur;
        compteur = mappingNewCompteur(compteurDto);
        compteur = service.createCompteur(compteur);
        CompteurSenderDTO compteurSenderDTO = mappingSenderDto(compteur);
        return compteurSenderDTO;
    }

    public List<CompteurSenderDTO> getCompteurList(String id){
        List<Compteur> compteurList = service.findCompteurByIdUser(id);
        List<CompteurSenderDTO> compteurSenderDTOList = mappingMultipleCompteur(compteurList);
        return compteurSenderDTOList;
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
        compteur.setFournisseur(compteurDto.id_fournisseur);
        compteur.setUser(compteurDto.id_user);
        return compteur;
    }

    public CompteurSenderDTO mappingSenderDto(Compteur compteur){
        List<Provider> providerList = keycloakService.getProviders();
        UserRepresentation userRepresentation = keycloakService.getUserById(compteur.getUser());
        CompteurSenderDTO compteurSenderDTO = new CompteurSenderDTO();
        compteurSenderDTO.id = compteur.getId();
        compteurSenderDTO.nom = compteur.getNom();
        compteurSenderDTO.nom_user = userRepresentation.getFirstName();
        Optional<Category> category = categoryRepository.findById(compteur.getCategory().getId());
        compteurSenderDTO.nom_category = category.get().getName();

        Optional<Provider> providerWithSpecialID = providerList.stream().filter(provider -> provider.getId()
                .equals(compteur.getFournisseur()))
                .findFirst();

        if(providerWithSpecialID.isPresent()){
            compteurSenderDTO.nom_fournisseur = providerWithSpecialID.get().getFirstName();
        }

        return compteurSenderDTO;

    }

    public List<CompteurSenderDTO> mappingMultipleCompteur(List<Compteur> compteurList){
        List<Provider> providerList = keycloakService.getProviders();
        List<Category> categoryList = categoryRepository.findAll();
        List<CompteurSenderDTO> compteurSenderDTOList = new ArrayList<>();

        for (Compteur compteur : compteurList){
            Optional<Provider> providerWithSpecialID = providerList.stream().filter(provider -> provider.getId()
                            .equals(compteur.getFournisseur()))
                    .findFirst();

            Optional<Category> categoryWithSpecialID = categoryList.stream().filter(category -> category.getId()
                            .equals(compteur.getCategory().getId()))
                    .findFirst();

            UserRepresentation userRepresentation = keycloakService.getUserById(compteur.getUser());

            CompteurSenderDTO compteurSenderDTO = new CompteurSenderDTO();
            compteurSenderDTO.id = compteur.getId();
            compteurSenderDTO.nom = compteur.getNom();
            compteurSenderDTO.nom_category = categoryWithSpecialID.get().getName();
            compteurSenderDTO.nom_fournisseur = providerWithSpecialID.get().getFirstName();
            compteurSenderDTO.nom_user = userRepresentation.getFirstName();

            compteurSenderDTOList.add(compteurSenderDTO);

        }
        return compteurSenderDTOList;
    }
}

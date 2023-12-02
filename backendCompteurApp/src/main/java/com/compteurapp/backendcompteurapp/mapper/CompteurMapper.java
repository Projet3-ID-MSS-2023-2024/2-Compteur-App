package com.compteurapp.backendcompteurapp.mapper;

import com.compteurapp.backendcompteurapp.DTO.CompteurDto;
import com.compteurapp.backendcompteurapp.DTO.CompteurSenderDTO;
import com.compteurapp.backendcompteurapp.model.*;
import com.compteurapp.backendcompteurapp.repository.CategoryRepository;
import com.compteurapp.backendcompteurapp.services.CompteurService;
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

        UserDB client = new UserDB();
        client.setId(compteurDto.id_user);

        UserDB provider = new UserDB();
        provider.setId(compteurDto.id_fournisseur);

        Compteur compteur = new Compteur();
        if(compteurDto.id != null){
            compteur.setId(compteurDto.id);
        }
        compteur.setNom(compteurDto.nom);
        compteur.setCategory(category);
        compteur.setAdresse(adresse);
        compteur.setProvider(provider);
        compteur.setClient(client);
        return compteur;
    }

    public CompteurSenderDTO mappingSenderDto(Compteur compteurReq){
        CompteurSenderDTO compteurSenderDTO = new CompteurSenderDTO();
        Optional<Compteur> compteur = service.getOneCompteur(compteurReq.getId());
        compteurSenderDTO.id = compteur.get().getId();
        compteurSenderDTO.nom = compteur.get().getNom();
        compteurSenderDTO.nom_category = compteur.get().getCategory().getName();
        compteurSenderDTO.nom_fournisseur = compteur.get().getProvider().getFirstname();
        compteurSenderDTO.nom_user = compteur.get().getClient().getFirstname();

        return compteurSenderDTO;

    }

    public List<CompteurSenderDTO> mappingMultipleCompteur(List<Compteur> compteurList){
        List<CompteurSenderDTO> compteurSenderDTOList = new ArrayList<>();

        for (Compteur compteur : compteurList){

            CompteurSenderDTO compteurSenderDTO = new CompteurSenderDTO();
            compteurSenderDTO.id = compteur.getId();
            compteurSenderDTO.nom = compteur.getNom();
            compteurSenderDTO.nom_category = compteur.getCategory().getName();
            compteurSenderDTO.nom_fournisseur = compteur.getProvider().getFirstname();
            compteurSenderDTO.nom_user = compteur.getClient().getFirstname();

            compteurSenderDTOList.add(compteurSenderDTO);

        }
        return compteurSenderDTOList;
    }

}

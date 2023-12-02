package com.compteurapp.backendcompteurapp.mapper;
import com.compteurapp.backendcompteurapp.DTO.CompteurDataDTO;
import com.compteurapp.backendcompteurapp.DTO.CompteurDataSenderDTO;
import com.compteurapp.backendcompteurapp.DTO.CompteurSenderDTO;
import com.compteurapp.backendcompteurapp.model.Adresse;
import com.compteurapp.backendcompteurapp.model.Compteur;
import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.services.CompteurDataService;
import com.compteurapp.backendcompteurapp.services.CompteurService;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;


@Component
public class CompteurDataMapper {

    @Autowired
    CompteurDataService service;

    @Autowired
    CompteurService compteurService;

    public CompteurDataSenderDTO createCompteurData(MultipartFile image, String client, String vendeur, double valeur, Long idCompteur, String rue, String numeros, String codePostal, String ville, String pays) throws IOException {

        CompteurData compteurData = new CompteurData();
        compteurData = saveBDCompteurData(image, client, vendeur, valeur, idCompteur);
        CompteurDataSenderDTO compteurSenderDTO = mappingSenderDto(compteurData);
        return compteurSenderDTO;
    }


    public String saveMetterImage(MultipartFile image) throws IOException {
        String fileName;
        fileName = RandomStringUtils.randomAlphanumeric(15) + "." + FilenameUtils.getExtension(image.getOriginalFilename());
        String uploadDir = "src/main/resources/ImgCompteur/";

        File uploadDirectory = new File(uploadDir);
        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdir();
        }

        Path uploadPath = Paths.get(uploadDir + fileName);
        image.transferTo(uploadPath);
        return fileName;
    }

    public CompteurData saveBDCompteurData(MultipartFile image, String client, String vendeur, double valeur, Long idCompteur) throws IOException {
        CompteurData compteurData = new CompteurData();

        UserDB clientCompteur = new UserDB();
        clientCompteur.setId(client);
        UserDB provider = new UserDB();
        provider.setId(vendeur);
        Compteur compteur = new Compteur();
        compteur.setId(idCompteur);
        String Nameimage = saveMetterImage(image);

        compteurData.setClient(clientCompteur);
        compteurData.setProvider(provider);
        compteurData.setCompteur(compteur);
        compteurData.setValeur(valeur);
        compteurData.setPhoto(Nameimage);
        compteurData.setDate(new Date());
        return service.createCompteurData(compteurData);
    }

    public CompteurDataSenderDTO mappingSenderDto(CompteurData compteurData){
        CompteurDataSenderDTO compteurDataSenderDTO = new CompteurDataSenderDTO();
        compteurDataSenderDTO.id = compteurData.getId();
        compteurDataSenderDTO.date = compteurData.getDate();
        compteurDataSenderDTO.valeur = compteurData.getValeur();
        compteurDataSenderDTO.photo = compteurData.getPhoto();
        compteurDataSenderDTO.client = compteurData.getClient().getFirstname();
        compteurDataSenderDTO.provider = compteurData.getProvider().getFirstname();
        return compteurDataSenderDTO;
    }


}

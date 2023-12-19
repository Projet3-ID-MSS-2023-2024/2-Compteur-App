package com.compteurapp.backendcompteurapp.mapper;
import com.compteurapp.backendcompteurapp.DTO.CompteurDataDTO;
import com.compteurapp.backendcompteurapp.DTO.CompteurDataSenderDTO;
import com.compteurapp.backendcompteurapp.DTO.CompteurSenderDTO;
import com.compteurapp.backendcompteurapp.model.*;
import com.compteurapp.backendcompteurapp.repository.FactureRepository;
import com.compteurapp.backendcompteurapp.services.CompteurDataService;
import com.compteurapp.backendcompteurapp.services.CompteurService;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.json.JSONObject;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;


import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Component
public class CompteurDataMapper {

    @Autowired
    CompteurDataService service;

    @Autowired
    CompteurService compteurService;

    public CompteurDataSenderDTO createCompteurData(MultipartFile image, String client, String vendeur, double valeur, Long idCompteur, String rue, String numeros, String codePostal, String ville, String pays, String device) throws Exception {

        CompteurData compteurData = new CompteurData();
        if(device=="mobile"){
            if(!verifyAdresse(idCompteur, ville, pays)) {
                throw new Exception("Adresse invalide");
            }
        }
        else{
            if(!verifieAdresseDesktop(idCompteur, ville, pays, rue, numeros, codePostal)) {
                throw new Exception("Adresse invalide");
            }
        }

        compteurData = saveBDCompteurData(image, client, vendeur, valeur, idCompteur);
        CompteurDataSenderDTO compteurSenderDTO = mappingSenderDto(compteurData);
        return compteurSenderDTO;
    }

    public CompteurDataSenderDTO findById(Long id){
        Optional<CompteurData> compteurData = service.findById(id);
        return mappingSenderDto(compteurData.get());
    }


    public String saveMetterImage(MultipartFile image) throws IOException {
        String fileName;
        fileName = RandomStringUtils.randomAlphanumeric(15) + "." + FilenameUtils.getExtension(image.getOriginalFilename());
        String uploadDir = "src/main/resources/static/ImgCompteur/";

        File uploadDirectory = new File(uploadDir);
        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdir();
        }

        Path uploadPath = Paths.get(uploadDir + fileName);
        image.transferTo(uploadPath);
        return fileName;
    }

    public CompteurData saveBDCompteurData(MultipartFile image, String client, String vendeur, double valeur, Long idCompteur)throws IOException {
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

    public List<CompteurDataSenderDTO> mappingCompteurDataByClientId(String idClient, int start, int end){
        List<CompteurData> compteurDataList = service.getCompteurDataByClientId(idClient, start, end);
        return mappingCompteurDataSenderList(compteurDataList);
    }

    public List<CompteurDataSenderDTO> mappingCompteurDataByVendeurIdWithoutFacture(String idVendeur, int start, int end){
        List<CompteurData> compteurDataList = service.getCompteurDataByVendeurIdWithoutFacture(idVendeur, start, end);
        return mappingCompteurDataSenderList(compteurDataList);
    }

    public List<CompteurDataSenderDTO> mappingCompteurDataByVendeurIdAndClientIdWithoutFacture(String idVendeur, String idClient,int start, int end){
        List<CompteurData> compteurDataList = service.getCompteurDataByVendeurIdAndClientIdWithoutFacture(idVendeur, idClient,start, end);
        return mappingCompteurDataSenderList(compteurDataList);
    }

    public List<CompteurDataSenderDTO> mappingCompteurDataByVendeurIdAndFactureEtat(String idVendeur, FactureStatement etat, int start, int end){
        List<CompteurData> compteurDataList = service.getCompteurDataByVendeurIdAndFactureEtat(idVendeur, etat, start, end);
        return mappingCompteurDataSenderList(compteurDataList);
    }

    public List<CompteurDataSenderDTO> mappingCompteurDataByVendeurIdAndClientIdAndFactureEtat(String idVendeur, String idClient, FactureStatement etat, int start, int end){
        List<CompteurData> compteurDataList = service.getCompteurDataByVendeurIdAndClientIdAndFactureEtat(idVendeur, idClient, etat,start, end);
        return mappingCompteurDataSenderList(compteurDataList);
    }

    public List<CompteurDataSenderDTO> mappingCompteurDataSenderList(List<CompteurData> compteurDataList){
        List<CompteurDataSenderDTO> compteurDataSenderDTOList = new ArrayList<>();
        for (CompteurData compteurData : compteurDataList) {
            CompteurDataSenderDTO compteurDataSenderDTO = new CompteurDataSenderDTO();
            compteurDataSenderDTO.id = compteurData.getId();
            compteurDataSenderDTO.date = compteurData.getDate();
            compteurDataSenderDTO.valeur = compteurData.getValeur();
            compteurDataSenderDTO.photo = compteurData.getPhoto();
            compteurDataSenderDTO.client = compteurData.getClient().getFirstname();
            compteurDataSenderDTO.provider = compteurData.getProvider().getFirstname();
            compteurDataSenderDTOList.add(compteurDataSenderDTO);
        }
        return compteurDataSenderDTOList;
    }

    public static JsonNode getCoordinates(String city, String country) throws Exception {
        String encodedAddress = URLEncoder.encode(city + ", " + country, StandardCharsets.UTF_8.toString());
        URL url = new URL("https://geocode.maps.co/search?q=" + encodedAddress);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("accept", "application/json");

        InputStream responseStream = connection.getInputStream();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(responseStream);

        return root.get(0); // return the first result
    }




    public boolean verifyAdresse(Long idCompteur, String ville, String pays) throws Exception {
        Compteur compteur = compteurService.getOneCompteur(idCompteur).get();
        String villeCompteur = compteur.getAdresse().getVille();
        String paysCompteur = compteur.getAdresse().getPays();

        // Get coordinates for the two cities
        JsonNode jsonVille = getCoordinates(ville, pays);
        JsonNode jsonVilleCompteur = getCoordinates(villeCompteur, paysCompteur);

        // Get the latitude and longitude
        double latVille = jsonVille.path("lat").asDouble();
        double lonVille = jsonVille.path("lon").asDouble();
        double latVilleCompteur = jsonVilleCompteur.path("lat").asDouble();
        double lonVilleCompteur = jsonVilleCompteur.path("lon").asDouble();

        // Calculate the distance between the two cities
        double distance = calculateDistance(latVille, lonVille, latVilleCompteur, lonVilleCompteur);

        // Check if the distance is less than 50 km
        return distance < 50;
    }




    public double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the earth in km

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    public boolean verifieAdresseDesktop(Long idCompteur, String ville, String pays, String rue, String numeros, String codePostal) throws Exception {
        Compteur compteur = compteurService.getOneCompteur(idCompteur).get();
        String villeCompteur = compteur.getAdresse().getVille();
        String paysCompteur = compteur.getAdresse().getPays();
        String rueCompteur = compteur.getAdresse().getRue();
        String numeroCompteur = compteur.getAdresse().getNumero();
        String codePostalCompteur = compteur.getAdresse().getCodePostal();
        if(ville.equals(villeCompteur) && pays.equals(paysCompteur) && rue.equals(rueCompteur) && numeros.equals(numeroCompteur) && codePostal.equals(codePostalCompteur)){
            return true;
        }
        else{
            return false;
        }
    }



}

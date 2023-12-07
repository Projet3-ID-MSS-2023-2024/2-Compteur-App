package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.model.Photo;
import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.repository.PhotoRepository;
import jakarta.transaction.Transactional;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Objects;

@Service
public class PhotoService {

    @Autowired
    private PhotoRepository photoRepository;

    public PhotoService(PhotoRepository photoRepository){
        this.photoRepository = photoRepository;
    }

    public String addPhoto(MultipartFile file, String id) {
        try {
            String fileName;
            fileName = RandomStringUtils.randomAlphanumeric(15) + "." + FilenameUtils.getExtension(file.getOriginalFilename());

            String uploadDir = "src/main/resources/static/pdp/";

            File uploadDirectory = new File(uploadDir);
            if (!uploadDirectory.exists()) {
                uploadDirectory.mkdir();
            }

            Path uploadPath = Paths.get(uploadDir + fileName);
            file.transferTo(uploadPath);

            Photo photo = new Photo();
            photo.setPath(fileName);
            photo.setDate(new Date().toString());

            UserDB user = new UserDB();
            user.setId(id);

            photo.setUser(user);

            this.photoRepository.save(photo);

            return fileName;
        } catch (Exception ex) {
            // Gérer les exceptions ici
            return null;
        }
    }

    public Photo getPhoto(String id){
        return photoRepository.findByUserId(id);
    }

    public String updatePhoto(MultipartFile file, String id) {
        try {
            String uploadDir = "src/main/resources/static/pdp/";

            // Récupérer la photo existante
            Photo existingPhoto = photoRepository.findByUserId(id);

            // Vérifiez que existingPhoto n'est pas null
            if (existingPhoto == null) {
                throw new Exception("La photo n'existe pas.");
            }

            // Copier le fichier dans le répertoire de destination
            Path uploadPath = Paths.get(uploadDir + existingPhoto.getPath());
            file.transferTo(uploadPath);

            // Vérifiez que le fichier a été correctement transféré
            if (!Files.exists(uploadPath)) {
                throw new Exception("Le transfert du fichier a échoué.");
            }

            return existingPhoto.getPath();
        } catch (Exception ex) {
            // Gérer les exceptions ici
            return null;
        }
    }



    @Transactional
    public Boolean deletePhotoByIdUser(String id){
        // Récupérer la photo de l'utilisateur
        Photo photo = photoRepository.findByUserId(id);

        if (photo != null) {
            // Récupérer le chemin de la photo
            String path = photo.getPath();

            path = "src/main/resources/static/pdp/" + path;

            try {
                // Supprimer le fichier de la photo
                Files.deleteIfExists(Paths.get(path));
            } catch (IOException e) {
                // Gérer les exceptions ici
                e.printStackTrace();
            }

            // Supprimer la photo de la base de données
            photoRepository.deleteByUser_Id(id);

            return true;
        }

        return false;
    }

    public Boolean deletePhotoById(Long id) {
        // Récupérer la photo
        Photo photo = photoRepository.findById(id).orElse(null);

        if (photo != null) {
            // Récupérer le chemin de la photo
            String path = photo.getPath();

            path = "src/main/resources/static/pdp/" + path;

            try {
                // Supprimer le fichier de la photo
                Files.deleteIfExists(Paths.get(path));
            } catch (IOException e) {
                // Gérer les exceptions ici
                e.printStackTrace();
            }

            // Supprimer la photo de la base de données
            photoRepository.delete(photo);

            return true;
        }

        return false;
    }

}

package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.model.Photo;
import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.repository.PhotoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

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

    public Photo addPhoto(MultipartFile file, String id) {
        try {
            // Récupérer le chemin de la racine du projet
            Path root = Path.of("C:\\Users\\franc\\Desktop\\2-Compteur-App\\compteurAppFrontend\\src\\assets\\images\\photo-profil\\");

            // Créer le chemin du dossier "Photo profil"
            Path folderPath = root.resolve("photo-profil");

            // Vérifier si le dossier existe, sinon le créer
            if (!Files.exists(folderPath)) {
                Files.createDirectories(folderPath);
            }

            // Créer le nom du fichier avec le nom original du fichier
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

            // Créer le chemin complet du fichier
            Path targetLocation = folderPath.resolve(fileName);

            // Copier le fichier dans le répertoire de destination
            Files.copy(file.getInputStream(), targetLocation);

            // Créer un nouvel objet Photo
            Photo photo = new Photo();

            // Modifier le chemin
            String path = targetLocation.toString();
            path = path.replace("C:\\Users\\franc\\Desktop\\2-Compteur-App\\compteurAppFrontend\\src\\assets\\images\\photo-profil\\", "..\\..\\..\\assets\\images\\photo-profil\\");
            photo.setPath(path);

            UserDB user = new UserDB();
            user.setId(id);
            photo.setUser(user);
            Date date = new Date();
            photo.setDate(date.toString());

            return photoRepository.save(photo);
        } catch (Exception ex) {
            // Gérer les exceptions ici
            return null;
        }
    }

    public Photo getPhoto(String id){
        return photoRepository.findByUserId(id);
    }

    public Photo updatePhoto(MultipartFile file, String id) {
        try {
            // Récupérer le chemin de la racine du projet
            Path root = Path.of("C:\\Users\\franc\\Desktop\\2-Compteur-App\\compteurAppFrontend\\src\\assets\\images\\photo-profil\\");

            // Créer le chemin du dossier "Photo profil"
            Path folderPath = root.resolve("photo-profil");

            // Vérifier si le dossier existe, sinon le créer
            if (!Files.exists(folderPath)) {
                Files.createDirectories(folderPath);
            }

            // Récupérer la photo existante
            Photo existingPhoto = photoRepository.findByUserId(id);

            // Supprimer l'ancienne photo
            if (existingPhoto != null) {
                String existingPath = existingPhoto.getPath();
                existingPath = existingPath.replace("..\\..\\..\\assets\\images\\photo-profil\\", "C:\\Users\\franc\\Desktop\\2-Compteur-App\\compteurAppFrontend\\src\\assets\\images\\photo-profil\\");
                Files.deleteIfExists(Paths.get(existingPath));
            }

            // Créer le nom du fichier avec le nom original du fichier
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

            // Créer le chemin complet du fichier
            Path targetLocation = folderPath.resolve(fileName);

            // Copier le fichier dans le répertoire de destination
            Files.copy(file.getInputStream(), targetLocation);

            // Modifier le chemin
            String path = targetLocation.toString();
            path = path.replace("C:\\Users\\franc\\Desktop\\2-Compteur-App\\compteurAppFrontend\\src\\assets\\images\\photo-profil\\", "..\\..\\..\\assets\\images\\photo-profil\\");

            Date date = new Date();

            // Mettre à jour la photo dans la base de données
            if (existingPhoto != null) {
                existingPhoto.setPath(path);
                existingPhoto.setDate(date.toString());
                return photoRepository.save(existingPhoto);
            } else {
                Photo photo = new Photo();
                photo.setPath(path);
                UserDB user = new UserDB();
                user.setId(id);
                photo.setUser(user);
                photo.setDate(date.toString());
                return photoRepository.save(photo);
            }
        } catch (Exception ex) {
            // Gérer les exceptions ici
            return null;
        }
    }


    @Transactional
    public void deletePhotoByIdUser(String id){
        // Récupérer la photo de l'utilisateur
        Photo photo = photoRepository.findByUserId(id);

        if (photo != null) {
            // Récupérer le chemin de la photo
            String path = photo.getPath();

            // Remplacer le chemin relatif par le chemin absolu
            path = path.replace("..\\..\\..\\assets\\images\\photo-profil\\", "C:\\Users\\franc\\Desktop\\2-Compteur-App\\compteurAppFrontend\\src\\assets\\images\\photo-profil\\");

            try {
                // Supprimer le fichier de la photo
                Files.deleteIfExists(Paths.get(path));
            } catch (IOException e) {
                // Gérer les exceptions ici
                e.printStackTrace();
            }

            // Supprimer la photo de la base de données
            photoRepository.deleteByUser_Id(id);
        }
    }



}

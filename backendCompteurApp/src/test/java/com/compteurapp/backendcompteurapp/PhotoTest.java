package com.compteurapp.backendcompteurapp;

import com.compteurapp.backendcompteurapp.DTO.UserDTO;
import com.compteurapp.backendcompteurapp.model.Photo;
import com.compteurapp.backendcompteurapp.repository.PhotoRepository;
import com.compteurapp.backendcompteurapp.repository.UserDBRepository;
import com.compteurapp.backendcompteurapp.security.KeycloakSecurityUtilTest;
import com.compteurapp.backendcompteurapp.services.PhotoService;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
public class PhotoTest {

        @Mock
        private PhotoRepository photoRepository;

        @InjectMocks
        private PhotoService photoService;

    private String fileName;



    @Test
    @Order(0)
    public void testAddPhoto() throws Exception {
        MultipartFile file = new MockMultipartFile("file", "hello.txt", MediaType.TEXT_PLAIN_VALUE, "Hello, World!".getBytes());
        String id = "123";

        String fileName = String.valueOf(photoService.addPhoto(file, id));

        this.setFileName(fileName);

        assertNotNull(fileName);
        verify(photoRepository, times(1)).save(any(Photo.class));

        // Vérifiez que le fichier existe
        Path uploadDir = Paths.get("src/main/resources/static/pdp/");
        assertTrue(Files.exists(uploadDir.resolve(fileName)));
    }

    @Test
    @Order(1)
    public void testDeletePhoto() {
        Long id = 123L;

        // Créez un mock de Photo pour simuler la photo que vous voulez supprimer
        Photo photo = new Photo();
        photo.setId(id);
        String fileName = this.getFileName();
        photo.setPath("src/main/resources/static/pdp/" + fileName); // Utilisez le fileName du test précédent

        // Simulez le comportement de photoRepository.findById
        when(photoRepository.findById(id)).thenReturn(Optional.of(photo));

        // Appellez la méthode deletePhoto
        Boolean result = photoService.deletePhotoById(id);

        // Vérifiez que le résultat est vrai et que photoRepository.delete a été appelé
        assertTrue(result);
        verify(photoRepository, times(1)).delete(photo);

        // Vérifiez que le fichier a été supprimé
        Path photoPath = Paths.get(photo.getPath());
        assertFalse(Files.exists(photoPath));
    }


    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}

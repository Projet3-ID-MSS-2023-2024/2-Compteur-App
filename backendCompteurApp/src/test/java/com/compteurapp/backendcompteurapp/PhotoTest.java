package com.compteurapp.backendcompteurapp;

import com.compteurapp.backendcompteurapp.DTO.UserDTO;
import com.compteurapp.backendcompteurapp.model.Photo;
import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.repository.PhotoRepository;
import com.compteurapp.backendcompteurapp.repository.UserDBRepository;
import com.compteurapp.backendcompteurapp.security.KeycloakSecurityUtilTest;
import com.compteurapp.backendcompteurapp.services.PhotoService;
import org.junit.jupiter.api.*;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
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
    @Autowired
    private PhotoRepository photoRepository;
    @Autowired
    private UserDBRepository UserDBRepository;
    private String fileName;
    private Long id = 123L;
    private String idUser = "idtestphoto";
    @BeforeEach
    public void setUp() throws IOException {
        String uploadDir = "src/main/resources/static/pdp/";

        File uploadDirectory = new File(uploadDir);
        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdir();
        }

        UserDB user = new UserDB();
        user.setId(idUser);

        this.UserDBRepository.save(user);

        MultipartFile file = new MockMultipartFile("file", "hello.txt", MediaType.TEXT_PLAIN_VALUE, "Hello, World!".getBytes());
        Photo photo = new Photo();
        photo.setId(id);
        photo.setPath(file.getOriginalFilename());
        photo.setDate("2021-05-05");
        photo.setUser(user);
        photoRepository.save(photo);
        fileName = photo.getPath();
        Path uploadPath = Paths.get("src/main/resources/static/pdp/" + fileName);
        file.transferTo(uploadPath);
    }
    @AfterEach
    public void tearDown() {
        // Récupérez l'utilisateur
        UserDB user = UserDBRepository.findById(idUser).orElse(null);
        if (user != null) {
            // Récupérez la photo associée à cet utilisateur
            Photo photo = photoRepository.findByUserId(user.getId());
            // Supprimez la photo
            if (photo != null) {
                Path filePath = Paths.get("src/main/resources/static/pdp/" + photo.getPath());
                try {
                    Files.deleteIfExists(filePath);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                photoRepository.delete(photo);
            }
            // Supprimez l'utilisateur
            UserDBRepository.delete(user);
        }
    }
    @Test
    @Order(0)
    public void testGetPhoto() {
        // Récupérez la photo existante
        Photo photo = photoRepository.findByUserId(idUser);
        assertNotNull(photo);

        // Vérifiez que le fichier existe
        Path uploadDir = Paths.get("src/main/resources/static/pdp/");
        assertTrue(Files.exists(uploadDir.resolve(fileName)));
    }
    @Test
    @Order(1)
    public void testAddPhoto() {
        assertNotNull(fileName);
        // Vérifiez que le fichier existe
        Path uploadDir = Paths.get("src/main/resources/static/pdp/");
        assertTrue(Files.exists(uploadDir.resolve(fileName)));
    }
    @Test
    @Order(2)
    public void testUpdatePhoto() {

        assertNotNull(fileName);

        Photo photo = photoRepository.findByUserId(idUser);
        assertNotNull(photo);
        MultipartFile newFile = new MockMultipartFile("file", "newfile.txt", MediaType.TEXT_PLAIN_VALUE, "Hello, New World!".getBytes());
        photo.setPath(newFile.getOriginalFilename());
        photoRepository.save(photo);
        Path uploadPath = Paths.get("src/main/resources/static/pdp/" + fileName);
        try {
            Files.deleteIfExists(uploadPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
        String newFileName = photo.getPath();
        assertNotNull(newFileName);
        assertNotEquals(fileName, newFileName);

        MultipartFile file = new MockMultipartFile("file", newFileName, MediaType.TEXT_PLAIN_VALUE, "Hello, World!".getBytes());
        Path newUploadPath = Paths.get("src/main/resources/static/pdp/" + newFileName);
        try {
            file.transferTo(newUploadPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
        Path uploadDir = Paths.get("src/main/resources/static/pdp/");
        assertTrue(Files.exists(uploadDir.resolve(newFileName)));
    }

    @Test
    @Order(3)
    public void testDeletePhoto() {
        Photo photo = photoRepository.findByUserId(idUser);
        assertNotNull(photo);
        photoRepository.delete(photo);
        assertFalse(photoRepository.existsById(id));
        Path photoPath = Paths.get("src/main/resources/static/pdp/" + fileName);
        try {
            Files.deleteIfExists(photoPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
        assertFalse(Files.exists(photoPath));
    }
}






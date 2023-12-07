package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.model.Photo;
import com.compteurapp.backendcompteurapp.services.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class PhotoController {

    @Autowired
    private PhotoService photoService;

    @GetMapping("/GetphotoProfile/{id}")
    public Photo getPhoto(@PathVariable("id") String id) {
        return photoService.getPhoto(id);
    }

    @PostMapping("/AddphotoProfile/{id}")
    public Photo uploadImage(@RequestParam("file") MultipartFile file, @PathVariable("id") String id) {
        photoService.addPhoto(file, id);
        Photo photo = new Photo();
        photo.setPath(file.getOriginalFilename());
        return photo;
    }

    @PutMapping("/UpdatephotoProfile/{id}")
    public Photo updatePhoto(@RequestParam("file") MultipartFile file, @PathVariable("id") String id) {
        photoService.updatePhoto(file, id);
        Photo photo = new Photo();
        photo.setPath(file.getOriginalFilename());
        return photo;
    }

    @DeleteMapping("/DeletephotoProfile/{id}")
    public void deletePhoto(@PathVariable("id") String id) {
        photoService.deletePhotoByIdUser(id);
    }
}
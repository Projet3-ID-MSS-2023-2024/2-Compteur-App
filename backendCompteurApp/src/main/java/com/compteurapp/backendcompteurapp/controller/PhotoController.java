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
    public String uploadImage(@RequestParam("file") MultipartFile file, @PathVariable("id") String id) {
        return photoService.addPhoto(file, id);
    }

    @PutMapping("/UpdatephotoProfile/{id}")
    public String updatePhoto(@RequestParam("file") MultipartFile file, @PathVariable("id") String id) {
        return photoService.updatePhoto(file, id);
    }

    @DeleteMapping("/DeletephotoProfile/{id}")
    public void deletePhoto(@PathVariable("id") String id) {
        photoService.deletePhotoByIdUser(id);
    }
}
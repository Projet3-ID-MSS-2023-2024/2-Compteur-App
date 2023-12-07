package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
    Photo findByUserId(String id);
    void deleteByUser_Id(String id);
}

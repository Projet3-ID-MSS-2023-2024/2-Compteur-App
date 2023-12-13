package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.Adresse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AdresseRepository extends JpaRepository<Adresse, Long> {
    Adresse findAdresseByUserUsername(String userName);
    Adresse findAdresseByUserId(String userId);




}

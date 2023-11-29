package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.Compteur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CompteurRepository extends JpaRepository<Compteur, Long> {
    List<Compteur> findByUserKeycloack(String idUser);
}



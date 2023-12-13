package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.Compteur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CompteurRepository extends JpaRepository<Compteur, Long> {
    List<Compteur> findByClient_Id(String idUser);

    List<Compteur> findByProvider_Id(String idUser);

}



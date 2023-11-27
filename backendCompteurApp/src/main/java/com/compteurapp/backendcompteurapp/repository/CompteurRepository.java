package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.Compteur;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CompteurRepository extends JpaRepository<Compteur, Long>{
}

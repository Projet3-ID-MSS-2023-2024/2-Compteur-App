package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.Facture;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FactureRepository extends JpaRepository<Facture, Long>{

}

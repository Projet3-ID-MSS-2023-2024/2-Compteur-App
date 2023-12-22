package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.Facture;
import org.springframework.data.jpa.repository.JpaRepository;
import com.compteurapp.backendcompteurapp.enums.FactureStatement;

import java.util.List;


public interface FactureRepository extends JpaRepository<Facture, Long>{

    List<Facture> findByCompteurData_Client_IdAndEtat(String idUser, FactureStatement state);

}

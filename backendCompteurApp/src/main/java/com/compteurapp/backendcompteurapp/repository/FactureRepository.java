package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.Facture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface FactureRepository extends JpaRepository<Facture, Long>{

    List<Facture> findByCompteurData_Client_Id(String idUser);

}

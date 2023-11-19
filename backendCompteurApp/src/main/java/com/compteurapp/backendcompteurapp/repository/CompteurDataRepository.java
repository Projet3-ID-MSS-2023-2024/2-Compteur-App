package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.CompteurData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompteurDataRepository extends JpaRepository<CompteurData, Long> {

    List<CompteurData> findByIdClient(Long idClient);
    List<CompteurData> findByIdVendeur(Long idVendeur);

}

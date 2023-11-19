package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.model.FactureStatement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompteurDataRepository extends JpaRepository<CompteurData, Long> {

    List<CompteurData> findByIdClient(Long idClient);
    List<CompteurData> findByIdVendeurAndFacturesIsNull(Long idVendeur);
    List<CompteurData> findByIdVendeurAndIdClientAndFacturesIsNull(Long idVendeur, Long idClient);
    List<CompteurData> findByIdVendeurAndFacturesEtat(Long idVendeur, FactureStatement etat);
    List<CompteurData> findByIdVendeurAndIdClientAndFacturesEtat(Long idVendeur, Long idClient, FactureStatement etat);



}

package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.model.FactureStatement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompteurDataRepository extends JpaRepository<CompteurData, Long> {

    Page<CompteurData> findByClient_Id(String idClient, Pageable pageable);
    Page<CompteurData> findByProvider_IdAndFacturesIsNull(String idVendeur, Pageable pageable);
    Page<CompteurData> findByProvider_IdAndClientAndFacturesIsNull(String idVendeur, String idClient, Pageable pageable);
    Page<CompteurData> findByProvider_IdAndFacturesEtat(String idVendeur, FactureStatement etat, Pageable pageable);
    Page<CompteurData> findByProvider_IdAndClientAndFacturesEtat(String idVendeur, String idClient, FactureStatement etat, Pageable pageable);
}

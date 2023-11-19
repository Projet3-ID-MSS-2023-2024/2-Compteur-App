package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.model.FactureStatement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompteurDataRepository extends JpaRepository<CompteurData, Long> {

    Page<CompteurData> findByClient(Long idClient, Pageable pageable);
    Page<CompteurData> findByVendeurAndFacturesIsNull(Long idVendeur, Pageable pageable);
    Page<CompteurData> findByVendeurAndClientAndFacturesIsNull(Long idVendeur, Long idClient, Pageable pageable);
    Page<CompteurData> findByVendeurAndFacturesEtat(Long idVendeur, FactureStatement etat, Pageable pageable);
    Page<CompteurData> findByVendeurAndClientAndFacturesEtat(Long idVendeur, Long idClient, FactureStatement etat, Pageable pageable);
}

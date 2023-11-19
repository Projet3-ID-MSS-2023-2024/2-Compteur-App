package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.CompteurData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompteurDataRepository extends JpaRepository<CompteurData, Long> {
}

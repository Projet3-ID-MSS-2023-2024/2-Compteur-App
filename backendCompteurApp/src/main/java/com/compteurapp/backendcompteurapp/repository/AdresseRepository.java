package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.Adresse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AdresseRepository extends JpaRepository<Adresse, Long> {
    @Query("SELECT u.adresse FROM UserDB u WHERE u.username = :userName")
    Adresse findAddressByUsername(@Param("userName") String userName);
}

package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.Adresse;
import com.compteurapp.backendcompteurapp.model.UserDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserDBRepository extends JpaRepository<UserDB, Long> {
    Optional<UserDB> findByEmail(String email);
    UserDB findById(String id);

    void deleteById(String id);

    @Query("SELECT u.adresse FROM UserDB u WHERE u.id = :userId")
    Adresse findAdresseByUserId(@Param("userId") String userId);

/*    String getRoleFromUser(String id);*/

}

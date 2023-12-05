package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.Adresse;
import com.compteurapp.backendcompteurapp.model.UserDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserDBRepository extends JpaRepository<UserDB, Long> {
    Optional<UserDB> findByEmail(String email);
    UserDB findById(String id);

    void deleteById(String id);

    @Query("SELECT u.adresse FROM UserDB u WHERE u.username = :userName")
    Adresse findAdresseByUserName(@Param("userName") String userName);
    }

    public interface UserDBRepository extends JpaRepository<UserDB, String> {
    UserDB findByUsername(String name);

    List<UserDB> findUserDBByCategory_Id(Long id);
}

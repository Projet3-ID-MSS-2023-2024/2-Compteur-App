package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.UserDB;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserDB, Long> {
    Optional<UserDB> findByEmail(String email);
    UserDB findById(String id);
}

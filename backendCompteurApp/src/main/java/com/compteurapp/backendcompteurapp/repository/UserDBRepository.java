package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.UserDB;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDBRepository extends JpaRepository<UserDB, Long> {
    Optional<UserDB> findByEmail(String email);
    UserDB findById(String id);

    void deleteById(String id);

/*    String getRoleFromUser(String id);*/

}

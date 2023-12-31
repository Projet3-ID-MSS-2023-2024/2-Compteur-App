package com.compteurapp.backendcompteurapp.repository;


import com.compteurapp.backendcompteurapp.model.Category;
import com.compteurapp.backendcompteurapp.model.UserDB;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserDBRepository extends JpaRepository<UserDB, String> {
    UserDB findByUsername(String name);

    List<UserDB> findUserDBByCategory_Id(Long id);

    UserDB findUserDBById(String id);
}

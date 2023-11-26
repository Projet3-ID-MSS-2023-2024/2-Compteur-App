package com.compteurapp.backendcompteurapp.repository;

import com.compteurapp.backendcompteurapp.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String name);

    void deleteByName(String name) ;
}

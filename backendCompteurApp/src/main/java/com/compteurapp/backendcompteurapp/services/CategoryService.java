package com.compteurapp.backendcompteurapp.services;

import com.compteurapp.backendcompteurapp.model.Category;
import com.compteurapp.backendcompteurapp.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public void addCategory(Category category){
        categoryRepository.save(category);
    }

    public Category getCategory(Long id){
        return categoryRepository.findById(id).get();
    }

    public void updateCategory(Category category){
        categoryRepository.save(category);
    }

    public Category getCategoryByName(String name){
        return categoryRepository.findByName(name);
    }

    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    public void deleteCategory(Long id){
        categoryRepository.deleteById(id);
    }

    public void deleteAllCategories(){
        categoryRepository.deleteAll();
    }


}

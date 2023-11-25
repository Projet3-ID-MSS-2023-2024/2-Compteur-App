package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.model.Category;
import com.compteurapp.backendcompteurapp.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/getCategories")
    public List<Category> getCategories(){
        return this.categoryService.getAllCategories();
    }

    @GetMapping("/getCategory")
    public Category getCategory(Long id){
        return this.categoryService.getCategory(id);
    }

    @GetMapping("/getCategoryByName")
    public Category getCategoryByName(String name){
        return this.categoryService.getCategoryByName(name);
    }

    @GetMapping("/deleteCategory")
    public void deleteCategory(Long id){
        this.categoryService.deleteCategory(id);
    }

    @GetMapping("/deleteAllCategories")
    public void deleteAllCategories(){
        this.categoryService.deleteAllCategories();
    }

    @GetMapping("/addCategory")
    public void addCategory(Category category){
        this.categoryService.addCategory(category);
    }

    @GetMapping("/updateCategory")
    public void updateCategory(Category category){
        this.categoryService.updateCategory(category);
    }
}

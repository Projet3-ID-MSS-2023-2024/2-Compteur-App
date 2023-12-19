package com.compteurapp.backendcompteurapp.controller;

import com.compteurapp.backendcompteurapp.model.Category;
import com.compteurapp.backendcompteurapp.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/getCategory/{id}")
    public Category getCategory(@PathVariable Long id){
        return this.categoryService.getCategory(id);
    }

    @GetMapping("/getCategoryByName{name}")
    public Category getCategoryByName(@PathVariable String name){
        return this.categoryService.getCategoryByName(name);
    }

    @DeleteMapping("/deleteCategory/{id}")
    public void deleteCategory(@PathVariable Long id){
        this.categoryService.deleteCategory(id);
    }

    @DeleteMapping("/deleteAllCategories")
    public void deleteAllCategories(){
        this.categoryService.deleteAllCategories();
    }

    @DeleteMapping("/deleteCategoryByName")
    public void deleteCategoryByName(@RequestParam String name){
        this.categoryService.deleteCategoryByName(name);
    }

    @PostMapping("/addCategory")
    public void addCategory(@RequestBody Category category){
        this.categoryService.addCategory(category);
    }

    @PutMapping("/updateCategory/")
    public void updateCategory(@RequestBody Category category){
        this.categoryService.updateCategory(category.getId(), category);
    }
}

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

    @GetMapping("/deleteCategory")
    public void deleteCategory(@RequestParam Long id){
        this.categoryService.deleteCategory(id);
    }

    @GetMapping("/deleteAllCategories")
    public void deleteAllCategories(){
        this.categoryService.deleteAllCategories();
    }

    @GetMapping("/addCategory")
    public void addCategory(@RequestBody Category category){
        this.categoryService.addCategory(category);
    }

    @GetMapping("/updateCategory")
    public void updateCategory(@RequestBody Category category){
        this.categoryService.updateCategory(category);
    }
}

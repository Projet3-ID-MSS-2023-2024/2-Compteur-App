package com.compteurapp.backendcompteurapp;

import com.compteurapp.backendcompteurapp.model.Category;
import com.compteurapp.backendcompteurapp.model.UserDB;
import com.compteurapp.backendcompteurapp.DTO.AdresseDTO;
import com.compteurapp.backendcompteurapp.repository.CategoryRepository;
import com.compteurapp.backendcompteurapp.services.AdresseService;
import com.compteurapp.backendcompteurapp.services.CategoryService;
import com.compteurapp.backendcompteurapp.services.KeycloakService;
import com.compteurapp.backendcompteurapp.services.UserDBService;
import com.compteurapp.backendcompteurapp.repository.AdresseRepository;
import com.compteurapp.backendcompteurapp.repository.UserDBRepository;
import org.aspectj.apache.bcel.util.Repository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CategoryTest {


    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CategoryService categoryService;

    public Category category;

    @BeforeEach
    public void init(){
       Category category = new Category();
       category.setName("testCategory");
       this.category = categoryRepository.save(category);
    }

    @AfterEach
    void clean(){
        categoryRepository.deleteById(this.category.getId());
    }

    @Test
    @Order(1)
    public void testGetCategory(){
        Category category = categoryService.getCategory(this.category.getId());
        assertEquals(category.getId(),this.category.getId());
        assertEquals(category.getName(),this.category.getName());
    }
    @Test
    @Order(2)
    public void testAddCategory(){
        Category category1 = new Category();
        category1.setName("testCategory5555");
        categoryService.addCategory(category1);

        List<Category> categoryList = categoryRepository.findAll();
        category1 = categoryList.get(categoryList.size() - 1);

        assertEquals(category1.getName(),"testCategory5555");
        categoryRepository.deleteById(category1.getId());
    }

    @Test
    @Order(3)
    public void testUpdateCategory() throws Exception {

        Category category1 = new Category();
        category1.setName("testCategory3");
        category1.setId(this.category.getId());

        categoryService.updateCategory(0L,category1);
        category1 = categoryRepository.findById(this.category.getId()).get();

        assertEquals(category1.getName(),"testCategory3");
    }

    @Test
    @Order(4)
    public void testGetCategoryByName() {
      Category category1 = categoryService.getCategoryByName("testCategory");

      assertEquals(category1.getName(),"testCategory");
      assertEquals(category1.getId(),this.category.getId());
    }

    @Test
    @Order(5)
    public void testDeleteCategoryById(){
        Category category1 = new Category();
        category1.setName("testCategoryDelete");

        category1 = categoryRepository.save(category1);

        categoryService.deleteCategory(category1.getId());

        assertNotEquals(categoryRepository.findById(this.category.getId()).get(),category1);
    }
}

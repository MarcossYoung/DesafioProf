package com.example.demo.controller;

import com.example.demo.exceptions.UserAlreadyExistsException;
import com.example.demo.model.AppUser;
import com.example.demo.model.ProductCategory;
import com.example.demo.repository.CategoryRepo;
import com.example.demo.repository.UserRepo;
import com.example.demo.service.AppUserService;
import com.example.demo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@PreAuthorize("hasRole('ADMIN')")
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AppUserService appUserService;
    @Autowired
    UserRepo userRepo;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    CategoryRepo categoryRepo;


    @PostMapping("/categories")
    public ResponseEntity<?> newCat(@RequestBody String category) {
        if (category == null ) {
            return ResponseEntity.badRequest().body("Category name is required.");
        }

        try {
            ProductCategory savedCategory = categoryService.save(new ProductCategory(category));
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Category already exists.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while creating the category.");
        }
    }



    @GetMapping("/categories")
    public ResponseEntity<?> getCategories(Pageable pageable) {
        int maxPageSize = 100;
        int pageSize = pageable.getPageSize();

        if (pageSize > maxPageSize) {
            pageable = PageRequest.of(pageable.getPageNumber(), maxPageSize, pageable.getSort());
        }

        Page<ProductCategory> categoryPage = categoryService.findAllPage(pageable);

        if (categoryPage.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(categoryPage);
    }


    @DeleteMapping("/category/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        if (categoryService.delete(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/users")
    public ResponseEntity<Page<AppUser>> getAllUsers(
            Pageable pageable
    ) {
        int maxPageSize = 100;
        int pageSize = pageable.getPageSize();

        if (pageSize > maxPageSize) {
            pageable = PageRequest.of(pageable.getPageNumber(), maxPageSize, pageable.getSort());
        }
        Page<AppUser> users =  userRepo.findAll(pageable);
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (appUserService.delete(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
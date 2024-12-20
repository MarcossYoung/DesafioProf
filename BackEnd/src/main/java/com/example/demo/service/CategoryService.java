package com.example.demo.service;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.ProductCategory;
import com.example.demo.repository.CategoryRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
    public class CategoryService {
    private final CategoryRepo categoryRepo;


        public CategoryService(CategoryRepo categoryRepository) {
            this.categoryRepo = categoryRepository;
        }

        public ProductCategory findById(Long id) throws ResourceNotFoundException {
            return categoryRepo.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        }
         public ProductCategory save(ProductCategory category) {
        return categoryRepo.save(category);
    }

        public Page<ProductCategory> findAllPage(Pageable pageable){
            return categoryRepo.findAll(pageable);
        }
        public List<ProductCategory> findAll(){
            return categoryRepo.findAll();
        }
        public boolean delete(Long id) {
        Optional<ProductCategory> category = categoryRepo.findById(id);
        if (category.isPresent()) {
            categoryRepo.delete(category.get());
            return true;
        }
        throw new RuntimeException("Product with ID " + id + " not found");
    }



}


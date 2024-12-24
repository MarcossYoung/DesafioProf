package com.example.demo.service;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.AppUser;
import com.example.demo.model.Product;
import com.example.demo.model.ProductCategory;
import com.example.demo.model.ProductType;
import com.example.demo.repository.CategoryRepo;
import com.example.demo.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepo productRepo;

    CategoryRepo categoryRepo;

    CategoryService categoryService;
    @Autowired
    public ProductService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    private final String UPLOAD_DIR = "uploads/";

    public Product guardar(Product p) {
        return productRepo.save(p);
    }



    public Product buscar(long id) throws RuntimeException {
        return productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
    }

    public Page<Product> findByCatAndOrType(Long category, ProductType productType, Pageable pageable) throws ResourceNotFoundException {
        if (category == null && productType == null) {
            return productRepo.findAll(pageable); // Return all when both are null
        }

        ProductCategory filterCategory = null;
        if (category != null) {
            filterCategory = categoryService.findById(category);
            if (filterCategory == null) {
                throw new ResourceNotFoundException("Category with ID " + category + " not found.");
            }
        }

        if (filterCategory == null) {
            return productRepo.findByProductType(productType, pageable); // Filter by productType only
        }
        if (productType == null ) {
            return productRepo.findByCategoryId(category, pageable); // Filter by category only
        }
        return productRepo.findByCategoryAndType(category, productType, pageable); // Filter by both category and type
    }


    public void editar(Long id, Product product) {
        Product existingProduct = productRepo.findById(id).orElse(null);
        if (existingProduct != null) {
            existingProduct.setTitulo(product.getTitulo());
            existingProduct.setBio(product.getBio());
            existingProduct.setPrecio(product.getPrecio());
            productRepo.save(existingProduct); // Save the updated product
        } else {
            throw new RuntimeException("Product with ID " + id + " not found");
        }
    }

    public boolean borrar(Long id) {
        Optional<Product> productOpt = productRepo.findById(id);
        if (productOpt.isPresent()) {
            productRepo.delete(productOpt.get());
            return true;
        }
        throw new RuntimeException("Product with ID " + id + " not found");
    }


    public Page<Product> search(String query, Pageable pageable) {
        return productRepo.searchByTitleOrDescription(query, pageable);
    }

    public List<Product> findByOwner(AppUser owner) {
        return productRepo.findByOwner(owner);
    }
}

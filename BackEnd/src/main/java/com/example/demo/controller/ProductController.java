package com.example.demo.controller;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.*;
import com.example.demo.service.AppUserService;
import com.example.demo.service.CategoryService;
import com.example.demo.service.FileStorageService;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private AppUserService userService;

    @GetMapping()
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Long category,
            @RequestParam(required = false) ProductType productType
    ) throws ResourceNotFoundException {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productService.findByCatAndOrType(category,productType,pageable);
        return ResponseEntity.ok(products);

    }

    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestParam("titulo") String titulo,
                                                 @RequestParam("precio") double precio,
                                                 @RequestParam("bio") String bio,
                                                 @RequestParam("color") String color,
                                                 @RequestParam("size") long size,
                                                 @RequestParam("sex") String sex,
                                                 @RequestParam("brand") String brandString,
                                                 @RequestParam("rent") String rent,
                                                 @RequestParam("category") long categoryId,
                                                 @RequestParam(value = "foto1", required = false) MultipartFile foto1,
                                                 @RequestParam(value = "foto2", required = false) MultipartFile foto2,
                                                 @RequestParam(value = "foto3", required = false) MultipartFile foto3,
                                                 @RequestParam(value = "foto4", required = false) MultipartFile foto4) {

        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            AppUser owner = userService.getCurrentUser();
            if (owner == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }


            Product product = new Product();
            product.setTitulo(titulo);
            product.setOwner(owner);
            product.setPrecio(precio);
            product.setBio(bio);
            product.setCategoryId(categoryId);
            product.setSex(sex);
            product.setSize(size);
            product.setColor(color);
            try {
                product.setRent(ProductType.valueOf(rent));
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(null);
            }


            try {
                product.setBrand(Brand.valueOf(brandString));
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(null);
            }


            if (foto1 != null && !foto1.isEmpty()) {
                product.setFoto1(fileStorageService.saveFile(foto1));
            }
            if (foto2 != null && !foto2.isEmpty()) {
                product.setFoto2(fileStorageService.saveFile(foto2));
            }
            if (foto3 != null && !foto3.isEmpty()) {
                product.setFoto3(fileStorageService.saveFile(foto3));
            }
            if (foto4 != null && !foto4.isEmpty()) {
                product.setFoto4(fileStorageService.saveFile(foto4));
            }

            Product savedProduct = productService.guardar(product);
            return ResponseEntity.ok(savedProduct);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        Product product = productService.buscar(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }


    @PostMapping("/edit/{id}")
    public ResponseEntity<Void> editProduct(@PathVariable Long id, @RequestBody Product product) {
        Product prodToEdit = productService.buscar(id);
        if (prodToEdit != null) {
            productService.editar(id, product);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productService.borrar(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Product>> searchProducts(
            @RequestParam("query") String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productService.search(query, pageable);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<ProductCategory>> getAllCategories() {
        return ResponseEntity.ok(categoryService.findAll());
    }
    @GetMapping("/brand")
    public ResponseEntity<List<Brand>> getAllBrands() {
        return ResponseEntity.ok(Arrays.asList(Brand.values()));
    }

    @GetMapping("/types")
    public ResponseEntity<List<ProductType>> getAllProductTypes() {
        return ResponseEntity.ok(Arrays.asList(ProductType.values()));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Product>> getByOwnerID(AppUser owner){
        return ResponseEntity.ok(productService.findByOwner(owner));
    }
}

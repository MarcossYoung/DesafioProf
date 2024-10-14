package com.example.demo.controller;

import com.example.demo.model.AppUser;
import com.example.demo.model.Product;
import com.example.demo.service.AppUserService;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {
    @Autowired
    private ProductService productService;


    @Autowired
    private AppUserService userService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
       return ResponseEntity.ok(productService.listarTodos());
    }
    @PostMapping("/api/product")
    public ResponseEntity<Product> createProduct(
            @RequestParam("productName") String productName,
            @RequestParam("category") Long categoryId,
            @RequestParam("price") double price,
            @RequestParam("description") String description,
            @RequestParam Long ownerId,
            @RequestParam(value = "foto1", required = false) MultipartFile foto1,
            @RequestParam(value = "foto2", required = false) MultipartFile foto2,
            @RequestParam(value = "foto3", required = false) MultipartFile foto3,
            @RequestParam(value = "foto4", required = false) MultipartFile foto4

    ) throws IOException {
        AppUser owner = userService.getUserById(ownerId);
        if (owner == null) {
            return ResponseEntity.badRequest().build();
        }

        // Create and save the product
        Product product = new Product();
        product.setTitulo(productName);
        product.setOwner(owner);
        product.setPrecio(price);
        product.setBio(description);
        product.setOwner(owner);

        // Save the image file
        if (foto1 != null && !foto1.isEmpty()) {
            product.setFoto1(productService.saveFile(foto1));
        }
        if (foto2 != null && !foto2.isEmpty()) {
            product.setFoto2(productService.saveFile(foto2));
        }
        if (foto3 != null && !foto3.isEmpty()) {
            product.setFoto3(productService.saveFile(foto3));
        }
        if (foto4 != null && !foto4.isEmpty()) {
            product.setFoto4(productService.saveFile(foto4));
        }

        Product savedProduct = productService.guardar(product);
        return ResponseEntity.ok(savedProduct);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable  Long id) {
        Product product = productService.buscar(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/edit/{id}")
    public ResponseEntity editProductForm(@PathVariable  Long id) {
        return ResponseEntity.ok(productService.buscar(id));
    }
    @PostMapping("/edit/{id}")
    public ResponseEntity<Product> geteditProduct(@PathVariable  Long id, @ModelAttribute Product product) {
        Product prodToEdit = productService.buscar(id);
        if( prodToEdit != null){
            productService.editar(id, product);
            return ResponseEntity.ok().build();

        }else{
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.borrar(id);
        return ResponseEntity.ok().build();
    }
    }



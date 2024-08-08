package com.example.demo.controller;

import com.example.demo.model.AppUser;
import com.example.demo.model.Product;
import com.example.demo.service.AppUserService;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;


    @Autowired
    private AppUserService userService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
       return ResponseEntity.ok(productService.listarTodos());
    }
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product, @RequestParam Long ownerId) {
        AppUser owner = userService.getUserById(ownerId);
        if (owner == null) {
            return ResponseEntity.badRequest().build();
        }
        product.setOwner(owner);
        Product savedProduct = productService.guardar(product);
        return ResponseEntity.ok(savedProduct);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@RequestParam Long id) {
        Product product = productService.buscar(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/edit/{id}")
    public ResponseEntity editProductForm(@RequestParam Long id) {
        return ResponseEntity.ok(productService.buscar(id));
    }
    @PostMapping("/edit/{id}")
    public String editProduct(@RequestParam Long id, @ModelAttribute Product product) {
        productService.editar(id, product);
        return "redirect:/products";
    }
    @GetMapping("/delete/{id}")
    public ResponseEntity<Void> deleteShop(@RequestParam Long id) {
        productService.borrar(id);
        return ResponseEntity.ok().build();
    }
    }



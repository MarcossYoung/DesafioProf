package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {

    // Correct query using named parameters
    @Query("SELECT p FROM Product p WHERE p.id = :productId")
    Optional<Product> findByProductId(@Param("productId") long productId);
}

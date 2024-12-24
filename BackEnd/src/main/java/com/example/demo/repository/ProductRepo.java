package com.example.demo.repository;

import com.example.demo.model.AppUser;
import com.example.demo.model.Product;
import com.example.demo.model.ProductCategory;
import com.example.demo.model.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {

    // Find products by type
    Page<Product> findByProductType(ProductType type, Pageable pageable);
    Page<Product> findByCategoryId(long category, Pageable pageable);


    @Query("SELECT p FROM Product p WHERE p.id = :id")
    Optional<Product> findById(@Param("id") Long id);

    @Query("SELECT p FROM Product p WHERE p.categoryId = :categoryId AND p.productType = :productType")
    Page<Product> findByCategoryAndType(@Param("categoryId") Long category, @Param("productType") ProductType productType, Pageable pageable);


    @Query("SELECT p FROM Product p WHERE LOWER(p.titulo) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(p.bio) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Product> searchByTitleOrDescription(@Param("query") String query, Pageable pageable);


    List<Product> findByOwner(AppUser owner);
}


package com.example.demo.repository;

import com.example.demo.model.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CategoryRepo extends JpaRepository<ProductCategory, Long> {

    Optional<ProductCategory> findById(long id);




}

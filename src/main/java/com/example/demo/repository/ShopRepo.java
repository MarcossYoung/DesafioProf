package com.example.demo.repository;

import com.example.demo.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShopRepo extends JpaRepository<Shop, Long> {

    /*@Query("select p from Paciente p where o.matricula = ?1")
    Odontologo findPacientebyOdonto(String matricula);*/

    @Query("select p from Shop p  where p.id = ?")
    Shop findByShopId (long id);

}

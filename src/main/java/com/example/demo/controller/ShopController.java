package com.example.demo.controller;

import com.example.demo.model.Shop;
import com.example.demo.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;

@Controller
@RequestMapping("/shop")
public class ShopController {

    private ShopService shopService;

    @Autowired
    public ShopController(ShopService ps){this.shopService = ps;}


    @PostMapping("/crearPac")
    public ResponseEntity<Shop> crearShop(@RequestBody Shop p){
       return ResponseEntity.ok(shopService.guardar(p));
    }

    @GetMapping("/{dni}")
    public ResponseEntity<Shop> shop(@PathVariable Integer id){
        Shop pac = shopService.buscar(id);
        if(Objects.nonNull(pac)){
            return ResponseEntity.ok(pac);

        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{dni}")
    public ResponseEntity<Shop> updatePac( @RequestBody Shop p ){
        Shop pac= shopService.buscar(p.getId());

        if(Objects.isNull(pac)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }else{
            return ResponseEntity.ok(shopService.guardar(pac));

        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> borrarPac(@PathVariable Integer id){
        Shop pac = shopService.buscar(id);

        if(Objects.isNull(pac)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }else{
            shopService.borrar(pac.getId());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Eliminado");

        }
    }

}

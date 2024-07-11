package com.example.demo.service;

import com.example.demo.model.Shop;
import com.example.demo.repository.ShopRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopService {

private final ShopRepo shopRepo;


@Autowired
public ShopService(ShopRepo ShopRepo1){
    this.shopRepo = ShopRepo1;
}


    public Shop guardar(Shop p) {
    return shopRepo.save(p);
}

    public List<Shop> listarTodos() {
    return shopRepo.findAll();}

    public Shop buscar(long id) throws RuntimeException {
     return shopRepo.findByShopId(id);
    }



    public void borrar(Long id) {shopRepo.delete(shopRepo.findByShopId(id));}
}

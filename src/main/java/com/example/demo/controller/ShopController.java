package com.example.demo.controller;

import com.example.demo.model.Shop;
import com.example.demo.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping("/shop")
public class ShopController {
    @Autowired
    private ShopService shopService;

    @GetMapping
    public String getAllShops(Model model) {
        List<Shop> shops = shopService.listarTodos();
        model.addAttribute("shops", shops);
        return "products";
    }
    @GetMapping("/crear")
    public String createShopForm(Model model) {
        model.addAttribute("shop", new Shop());
        return "crearShop";
    }

    @GetMapping("/{id}")
    public String getShop(@PathVariable Long id, Model model) {
        Shop shop = shopService.buscar(id);
        model.addAttribute("shop", shop);
        return "productDetail";
    }

    @GetMapping("/edit/{id}")
    public String editShopForm(@PathVariable Long id, Model model) {
        Shop shop = shopService.buscar(id);
        model.addAttribute("shop", shop);
        return "editProduct";
    }
    @PostMapping("/edit/{id}")
    public String editShop(@PathVariable Long id, @ModelAttribute Shop shop) {
        shopService.editar(id, shop);
        return "redirect:/shops";
    }
    @GetMapping("/delete/{id}")
    public String deleteShop(@PathVariable Long id) {
        shopService.borrar(id);
        return "redirect:/shops";
    }
    }



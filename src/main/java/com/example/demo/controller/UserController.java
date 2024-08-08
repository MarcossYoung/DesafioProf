package com.example.demo.controller;

import com.example.demo.model.AppUser;
import com.example.demo.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private AppUserService appUserService;

    @PostMapping("/registro")
    public ResponseEntity<AppUser> registro(@RequestBody AppUser user) {
        AppUser regUser = appUserService.registerUser(user);
        return ResponseEntity.ok(regUser);
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@ModelAttribute AppUser user) {
        if (appUserService.loginUser(user)) {
            return ResponseEntity.ok().build();

        } else {
            return ResponseEntity.status(401).build();

        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppUser> getUser(@RequestParam Long id) {
        return ResponseEntity.ok(appUserService.getUserById(id));
    }
    }
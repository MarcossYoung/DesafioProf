package com.example.demo.controller;

import com.example.demo.exceptions.UserAlreadyExistsException;
import com.example.demo.model.AppUser;
import com.example.demo.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private AppUserService appUserService;

    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody AppUser user) {
        try {
            AppUser regUser = appUserService.registerUser(user);
            return ResponseEntity.ok(regUser);
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(409).body("User already exists.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred during registration.");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody AppUser user) {
        if (appUserService.loginUser(user)) {
            return ResponseEntity.ok().build();

        } else {
            return ResponseEntity.status(401).build();

        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppUser> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(appUserService.getUserById(id));
    }
    }
package com.example.demo.controller;

import com.example.demo.model.AppUser;
import com.example.demo.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private AppUserService appUserService;

    @PostMapping("/registro")
    public String registro(@ModelAttribute AppUser user) {
        appUserService.registerUser(user);
        return "redirect:/login";
    }

    @PostMapping("/login")
    public String login(@ModelAttribute AppUser user) {
        if (appUserService.loginUser(user)) {
            return "redirect:/profile";
        } else {
            return "login";
        }
    }

    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id, Model model) {
        model.addAttribute("user", appUserService.getUserById(id));
        return "profile";
    }
    }
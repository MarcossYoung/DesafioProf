package com.example.demo.service;

import com.example.demo.model.AppUser;
import com.example.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {

    @Autowired
    private UserRepo appUserRepository;

    public void registerUser(AppUser user) {
        appUserRepository.save(user);
    }

    public boolean loginUser(AppUser user) {
        AppUser foundUser = appUserRepository.findByUser(user.getUsername());
        return foundUser != null && foundUser.getPassword().equals(user.getPassword());
    }

    public AppUser getUserById(Long id) {
        return appUserRepository.findById(id).orElse(null);
    }
}

package com.example.demo.service;

import com.example.demo.model.AppUser;
import com.example.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {

    @Autowired
    private UserRepo appUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AppUser registerUser(AppUser registration) {
        AppUser user = new AppUser();
        user.setUsername(registration.getUsername());
        user.setPassword(passwordEncoder.encode(registration.getPassword()));
        user.setEmail(registration.getEmail());
       return appUserRepository.save(user);
    }

    public boolean loginUser(AppUser user) {
        AppUser foundUser = appUserRepository.findByUser(user.getUsername());
        return foundUser != null && foundUser.getPassword().equals(user.getPassword());
    }

    public AppUser getUserById(Long id) {
        return appUserRepository.findById(id).orElse(null);
    }
}

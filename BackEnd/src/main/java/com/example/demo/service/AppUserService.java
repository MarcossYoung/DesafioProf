package com.example.demo.service;

import com.example.demo.exceptions.UserAlreadyExistsException;
import com.example.demo.model.AppUser;
import com.example.demo.model.AppUserRole;
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
        if (appUserRepository.existsByEmail(registration.getEmail())) {
            throw new UserAlreadyExistsException("User with this email already exists.");
        }

        AppUser user = new AppUser();
        user.setUsername(registration.getUsername());
        user.setPassword(passwordEncoder.encode(registration.getPassword()));
        user.setEmail(registration.getEmail());
        user.setAppUserRole(AppUserRole.USER);

        return appUserRepository.save(user);
    }

    public boolean loginUser(AppUser user) {
        AppUser foundUser = appUserRepository.findByUsername(user.getUsername());

        if (foundUser != null) {
            return passwordEncoder.matches(user.getPassword(), foundUser.getPassword());
        }
        return false;
    }

    public AppUser getUserById(Long id) {
        return appUserRepository.findById(id).orElse(null);
    }
}

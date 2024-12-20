package com.example.demo.service;

import com.example.demo.exceptions.UserAlreadyExistsException;
import com.example.demo.model.AppUser;
import com.example.demo.model.AppUserRole;
import com.example.demo.model.Product;
import com.example.demo.model.ProductCategory;
import com.example.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.*;


@Service
public class AppUserService {
    Authentication auth;


    private static final long EXPIRATION_TIME = 86400000;

    @Value("${jwt.secret}")
    private String secretKey;


    @Autowired
    private UserRepo appUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Page<AppUser> getAll(Pageable pageable) {
        return appUserRepository.findAll(pageable);
    }


    public AppUser registerUser(AppUser registration) {
        if (appUserRepository.existsByEmail(registration.getEmail())) {
            throw new UserAlreadyExistsException("User with this email already exists.");
        }

        AppUser user = new AppUser();
        user.setUsername(registration.getUsername());
        user.setPassword(passwordEncoder.encode(registration.getPassword()));
        user.setEmail(registration.getEmail());
        user.setAppUserRole(AppUserRole.USER);
        user.setName(registration.getName());

        return appUserRepository.save(user);
    }

    public boolean loginUser(AppUser user) {
        Optional<AppUser> optionalAppUser = appUserRepository.findByUsername(user.getUsername());
        if (optionalAppUser.isEmpty()) {
            throw new UsernameNotFoundException("User not found: " + user.getUsername());
        }
        AppUser foundUser = optionalAppUser.get();
        System.out.println(foundUser);

        if (foundUser != null && passwordEncoder.matches(user.getPassword(), foundUser.getPassword())) {

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(foundUser, null, foundUser.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            return true;
        }
        return false;
    }

    public AppUser getUserById(Long id) {
        return appUserRepository.findById(id).orElse(null);
    }

    public Optional<AppUser> findByUsername(String username){ return  appUserRepository.findByUsername(username); }


    public String generateToken(AppUser user) {
        byte[] secretKeyBytes = Base64.getDecoder().decode(secretKey);
        Key key = new SecretKeySpec(secretKeyBytes, SignatureAlgorithm.HS256.getJcaName());

        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public AppUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        String username = authentication.getName();
        return appUserRepository.findByUsername(username).orElse(null);
    }

    public boolean delete(Long id) {
        Optional<AppUser> category = appUserRepository.findById(id);
        if (category.isPresent()) {
            appUserRepository.delete(category.get());
            return true;
        }
        throw new RuntimeException("Product with ID " + id + " not found");
    }}

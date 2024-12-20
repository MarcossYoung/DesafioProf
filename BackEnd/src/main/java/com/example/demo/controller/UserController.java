package com.example.demo.controller;

import com.example.demo.exceptions.UserAlreadyExistsException;
import com.example.demo.model.AppUser;
import com.example.demo.repository.UserRepo;
import com.example.demo.service.AppUserService;
import com.example.demo.service.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AppUserService appUserService;
    @Autowired
    UserRepo userRepo;

    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody AppUser user) {
        try {
            AppUser regUser = appUserService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(regUser);
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during registration.");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> logIn(@RequestBody AppUser user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            AppUser foundUser = appUserService.findByUsername(user.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found: " + user.getUsername()));

            SecurityContextHolder.getContext().setAuthentication(authentication);


            String token = jwtTokenUtil.generateToken(foundUser.getUsername());


            Map<String, Object> response = new HashMap<>();
            response.put("username", foundUser.getUsername());
            response.put("id", foundUser.getId());
            response.put("email", foundUser.getEmail());
            response.put("role", foundUser.getAppUserRole());
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<AppUser> getUser(@PathVariable Long id) {


        System.out.println(appUserService.getUserById(id));
        return ResponseEntity.ok(appUserService.getUserById(id));
    }
    }
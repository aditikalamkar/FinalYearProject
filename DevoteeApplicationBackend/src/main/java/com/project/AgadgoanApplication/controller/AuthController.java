package com.project.AgadgoanApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.project.AgadgoanApplication.model.Devotee;
import com.project.AgadgoanApplication.services.AuthService;

import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;

@RestController

//@CrossOrigin(origins = " \"http://localhost:4200\", \"http://3.80.55.195\"", allowCredentials = "true")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody Devotee devotee, HttpSession session) {
        Devotee saved = service.register(devotee);
        if (saved != null) {
            session.setAttribute("user", saved);
            return ResponseEntity.ok(Map.of("message", "Registered and Logged in", "user", saved));
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "User already exists"));
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<String> login(@RequestBody Devotee devotee, HttpSession session) {
        Devotee user = service.login(devotee.getEmail(), devotee.getPassword());
        if (user != null) {
            session.setAttribute("user", user);
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/auth/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }


    @GetMapping("/auth/is-authenticated")
    public ResponseEntity<Boolean> isAuthenticated(HttpSession session) {
        return ResponseEntity.ok(session.getAttribute("user") != null);
    }
    
    @GetMapping("/auth/profile/info")
    public ResponseEntity<?> getDevoteeInfo(HttpSession session) {
        Devotee user = (Devotee) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        // Return only necessary profile fields
        Map<String, Object> profileData = new HashMap<>();
        profileData.put("name", user.getName());
        profileData.put("email", user.getEmail());
        profileData.put("mobile", user.getMobile());

        return ResponseEntity.ok(profileData);
    }

}

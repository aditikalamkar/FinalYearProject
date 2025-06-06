package com.project.AgadgoanApplication.controller;



import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.AgadgoanApplication.dao.DarshanRepository;
import com.project.AgadgoanApplication.dao.PangatBookingRepository;
import com.project.AgadgoanApplication.dao.PrasadBookingRepository;
import com.project.AgadgoanApplication.model.Admin;
import com.project.AgadgoanApplication.services.AdminService;

import jakarta.servlet.http.HttpSession;

@RestController

public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private DarshanRepository darshanRepo;

    @Autowired
    private PangatBookingRepository pangatRepo;

    @Autowired
    private PrasadBookingRepository prasadRepo;


    @PostMapping("/admin/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> admin,
                                        HttpSession session) {
        String username = admin.get("username");
        String password = admin.get("password");

        if ("admin".equals(username) && "admin123".equals(password)) {
            session.setAttribute("isAdminLoggedIn", true);
            return ResponseEntity.ok("Admin login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/admin/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out Successfully");
    }

    @GetMapping("/admin/check-session")
    public ResponseEntity<Boolean> checkAdminSession(HttpSession session) {
        Boolean isAdmin = (Boolean) session.getAttribute("isAdminLoggedIn");
        return ResponseEntity.ok(isAdmin != null && isAdmin);
    }

    @GetMapping("/admin/pangat")
    public ResponseEntity<?> getAllPangatBookings(HttpSession session) {
        if (!isAdminLoggedIn(session)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Access");
        }
        return ResponseEntity.ok(pangatRepo.findAll());
    }

    @GetMapping("/admin/prasad")
    public ResponseEntity<?> getAllPrasadBookings(HttpSession session) {
        if (!isAdminLoggedIn(session)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Access");
        }
        return ResponseEntity.ok(prasadRepo.findAll());
    }

    @GetMapping("/admin/darshan")
    public ResponseEntity<?> getAllDarshanBookings(HttpSession session) {
        if (!isAdminLoggedIn(session)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Access");
        }
        return ResponseEntity.ok(darshanRepo.findAll());
    }

    private boolean isAdminLoggedIn(HttpSession session) {
        Boolean isLoggedIn = (Boolean) session.getAttribute("isAdminLoggedIn");
        return isLoggedIn != null && isLoggedIn;
    }
}

package com.project.AgadgoanApplication.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.AgadgoanApplication.dao.DevoteeRepository;
import com.project.AgadgoanApplication.model.Devotee;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    DevoteeRepository devoteeRepo;

    @Override
    public Devotee register(Devotee devotee) {
        Devotee existing = devoteeRepo.findByEmail(devotee.getEmail());
        if (existing != null) {
            return null; // already registered
        }
        // Default role
        devotee.setRole("USER");
        return devoteeRepo.save(devotee);
    }

    @Override
    public Devotee login(String email, String password) {
        Devotee existing = devoteeRepo.findByEmail(email);
        if (existing != null && existing.getPassword().equals(password)) {
            return existing;
        }
        return null;
    }
}

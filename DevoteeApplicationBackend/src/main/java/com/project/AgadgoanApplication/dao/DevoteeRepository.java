package com.project.AgadgoanApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.AgadgoanApplication.model.Devotee;

@Repository
public interface DevoteeRepository extends JpaRepository<Devotee, Integer> {

    Devotee findByEmailAndPassword(String email, String password);

    Devotee findByEmail(String email);
}

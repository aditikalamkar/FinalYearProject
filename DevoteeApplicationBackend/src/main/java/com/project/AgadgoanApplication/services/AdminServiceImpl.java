package com.project.AgadgoanApplication.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.AgadgoanApplication.dao.AdminRepository;
import com.project.AgadgoanApplication.model.Admin;

@Service
public class AdminServiceImpl implements AdminService{

	@Autowired
	private AdminRepository adminRepo;
	
	@Override
	public Admin login(String adminUsername, String adminPassword) {
	    Admin admin = adminRepo.findByAdminUsername(adminUsername);

	    if (admin != null && admin.getAdminPassword().equals(adminPassword)) {
	        return admin;
	    }

	    return null;
	}


}

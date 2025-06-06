package com.project.AgadgoanApplication.services;

import com.project.AgadgoanApplication.model.Admin;

public interface AdminService {

	Admin login(String adminUsername, String adminPassword); 
}

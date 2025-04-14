package com.project.AgadgoanApplication.services;

import com.project.AgadgoanApplication.model.Devotee;

public interface AuthService {

	Devotee register(Devotee devotee);
	Devotee login(String email, String password);
}

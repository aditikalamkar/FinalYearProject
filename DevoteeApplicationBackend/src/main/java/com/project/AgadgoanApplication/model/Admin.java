package com.project.AgadgoanApplication.model;



import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "Admin")
public class Admin {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable=false,unique = true)
	private String adminUsername;
	@Column(nullable=false,unique = true)

	private String adminPassword;
	@Column(nullable = false)
    private String role = "ROLE_ADMIN"; 
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "devotee_id", nullable = false) // Foreign key to Devotee table
    @JsonIgnore
    private Devotee devotee;
	
	public Admin() {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAdminUsername() {
		return adminUsername;
	}

	public void setAdminUsername(String adminUsername) {
		this.adminUsername = adminUsername;
	}

	public String getAdminPassword() {
		return adminPassword;
	}

	public void setAdminPassword(String adminPassword) {
		this.adminPassword = adminPassword;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Devotee getDevotee() {
		return devotee;
	}

	public void setDevotee(Devotee devotee) {
		this.devotee = devotee;
	}

	public Admin(int id, String adminUsername, String adminPassword, String role, Devotee devotee) {
		super();
		this.id = id;
		this.adminUsername = adminUsername;
		this.adminPassword = adminPassword;
		this.role = role;
		this.devotee = devotee;
	}

	@Override
	public String toString() {
		return "Admin [id=" + id + ", adminUsername=" + adminUsername + ", adminPassword=" + adminPassword + ", role="
				+ role + ", devotee=" + devotee + "]";
	}

	
	
}

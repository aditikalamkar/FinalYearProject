package com.project.AgadgoanApplication.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "Devotees")    
public class Devotee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    @Column(unique = true)
    private String mobile;
    @Column(unique = true)
    private String email;
    private String password;
    private String role;

    @OneToMany(mappedBy = "devotee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<DarshanBooking> darshanBookings;

    @OneToMany(mappedBy = "devotee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<PangatBooking> pangatBookings;

    @OneToMany(mappedBy = "devotee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<PrasadBooking> prasadBookings;
    
    public Devotee() {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<DarshanBooking> getDarshanBookings() {
		return darshanBookings;
	}

	public void setDarshanBookings(List<DarshanBooking> darshanBookings) {
		this.darshanBookings = darshanBookings;
	}

	public List<PangatBooking> getPangatBookings() {
		return pangatBookings;
	}

	public void setPangatBookings(List<PangatBooking> pangatBookings) {
		this.pangatBookings = pangatBookings;
	}

	public List<PrasadBooking> getPrasadBookings() {
		return prasadBookings;
	}

	public void setPrasadBookings(List<PrasadBooking> prasadBookings) {
		this.prasadBookings = prasadBookings;
	}

	@Override
	public String toString() {
		return "Devotee [id=" + id + ", name=" + name + ", mobile=" + mobile + ", email=" + email + ", password="
				+ password + ", role=" + role + ", darshanBookings=" + darshanBookings + ", pangatBookings="
				+ pangatBookings + ", prasadBookings=" + prasadBookings + "]";
	}

	public Devotee(int id, String name, String mobile, String email, String password, String role,
			List<DarshanBooking> darshanBookings, List<PangatBooking> pangatBookings,
			List<PrasadBooking> prasadBookings) {
		super();
		this.id = id;
		this.name = name;
		this.mobile = mobile;
		this.email = email;
		this.password = password;
		this.role = role;
		this.darshanBookings = darshanBookings;
		this.pangatBookings = pangatBookings;
		this.prasadBookings = prasadBookings;
	}
    
    
}

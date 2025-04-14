package com.project.AgadgoanApplication.model;

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
@Table(name="prasad_booking")
public class PrasadBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String date;
    private String timeSlot;
    private int noOfPeople;
    
    @Column(nullable = true) // Makes message optional
    private String message;

    @Column(nullable = true) // Makes donation optional
    private Integer donation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "devotee_id", nullable = false)
    private Devotee devotee;
	
	public PrasadBooking() {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTimeSlot() {
		return timeSlot;
	}

	public void setTimeSlot(String timeSlot) {
		this.timeSlot = timeSlot;
	}

	public int getNoOfPeople() {
		return noOfPeople;
	}

	public void setNoOfPeople(int noOfPeople) {
		this.noOfPeople = noOfPeople;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Integer getDonation() {
		return donation;
	}

	public void setDonation(Integer donation) {
		this.donation = donation;
	}

	public Devotee getDevotee() {
		return devotee;
	}

	public void setDevotee(Devotee devotee) {
		this.devotee = devotee;
	}

	public PrasadBooking(int id, String date, String timeSlot, int noOfPeople, String message, Integer donation,
			Devotee devotee) {
		super();
		this.id = id;
		this.date = date;
		this.timeSlot = timeSlot;
		this.noOfPeople = noOfPeople;
		this.message = message;
		this.donation = donation;
		this.devotee = devotee;
	}

	@Override
	public String toString() {
		return "PrasadBooking [id=" + id + ", date=" + date + ", timeSlot=" + timeSlot + ", noOfPeople=" + noOfPeople
				+ ", message=" + message + ", donation=" + donation + ", devotee=" + devotee + "]";
	}


    
	
}

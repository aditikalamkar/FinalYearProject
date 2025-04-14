package com.project.AgadgoanApplication.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "pangat_bookings")
public class PangatBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String date;
    private String timeSlot;
    private int noOfPeople;
    private int amount;

    @Column(nullable = true) // Makes donation optional
    private Integer donation;

    @Column(nullable = true) // Makes message optional
    private String message;

    @ManyToOne
    @JoinColumn(name = "devotee_id", nullable = false)  // foreign key column
    private Devotee devotee;

    public PangatBooking() {}

    // Getters & Setters

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

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Integer getDonation() {
        return donation;
    }

    public void setDonation(Integer donation) {
        this.donation = donation;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Devotee getDevotee() {
        return devotee;
    }

    public void setDevotee(Devotee devotee) {
        this.devotee = devotee;
    }

    @Override
    public String toString() {
        return "PangatBooking [id=" + id + ", date=" + date + ", timeSlot=" + timeSlot + ", noOfPeople=" + noOfPeople
                + ", amount=" + amount + ", donation=" + donation + ", message=" + message + "]";
    }
}

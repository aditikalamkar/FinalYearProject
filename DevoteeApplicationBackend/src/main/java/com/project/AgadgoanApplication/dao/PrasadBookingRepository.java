package com.project.AgadgoanApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.AgadgoanApplication.model.Devotee;
import com.project.AgadgoanApplication.model.PrasadBooking;

@Repository
public interface PrasadBookingRepository extends JpaRepository<PrasadBooking, Integer> {

    // Find bookings by devotee name
    List<PrasadBooking> findByDevotee_Name(String name);

    // Sum of all people booked for a specific date and time slot
    @Query("SELECT COALESCE(SUM(p.noOfPeople), 0) FROM PrasadBooking p WHERE p.date = :date AND p.timeSlot = :timeSlot")
    int getTotalBooked(@Param("date") String date, @Param("timeSlot") String timeSlot);
    // Find bookings by devotee entity
    List<PrasadBooking> findByDevotee(Devotee devotee);
}

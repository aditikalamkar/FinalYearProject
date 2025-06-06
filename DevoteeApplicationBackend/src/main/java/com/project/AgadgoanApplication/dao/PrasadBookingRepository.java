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
   
    // Find bookings by devotee entity
    List<PrasadBooking> findByDevotee(Devotee devotee);
    
    @Query("SELECT COALESCE(SUM(d.noOfPeople), 0) FROM PrasadBooking d WHERE d.date = :date AND d.timeSlot = :timeSlot")
    int getTotalPeopleBookedForSlot(@Param("date") String date, @Param("timeSlot") String timeSlot);
}

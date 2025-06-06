package com.project.AgadgoanApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.AgadgoanApplication.model.PangatBooking;
import com.project.AgadgoanApplication.model.Devotee;

@Repository
public interface PangatBookingRepository extends JpaRepository<PangatBooking, Integer> {

    // Find bookings by the name of the devotee. Make sure that 'name' is a valid field in the Devotee entity.
    List<PangatBooking> findByDevotee_Name(String name); 

    // Count bookings by date and time slot.
    int countByDateAndTimeSlot(String date, String timeSlot);
    List<PangatBooking> findByDateAndTimeSlot(String date, String timeSlot);

    @Query("SELECT COALESCE(SUM(d.noOfPeople), 0) FROM PangatBooking d WHERE d.date = :date AND d.timeSlot = :timeSlot")
    int getTotalPeopleBookedForSlot(@Param("date") String date, @Param("timeSlot") String timeSlot);
    
    // Get all bookings for a particular devotee.
    List<PangatBooking> findByDevotee(Devotee devotee); 
}

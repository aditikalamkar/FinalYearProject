package com.project.AgadgoanApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.AgadgoanApplication.model.DarshanBooking;
import com.project.AgadgoanApplication.model.Devotee;

@Repository
public interface DarshanRepository extends JpaRepository<DarshanBooking, Integer> {

    // Find bookings by devotee's name (assumes Devotee has a 'name' field)
    List<DarshanBooking> findByDevotee_Name(String name);

    // Find bookings by specific date and time slot
    List<DarshanBooking> findByDateAndTimeSlot(String date, String timeSlot);

    // Get all bookings for a particular devotee
    List<DarshanBooking> findByDevotee(Devotee devotee);

    // Count bookings on a given date and time slot — useful for checking capacity
    int countByDateAndTimeSlot(String date, String timeSlot);
}

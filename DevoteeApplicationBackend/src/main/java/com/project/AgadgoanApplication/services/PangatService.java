package com.project.AgadgoanApplication.services;

import java.util.List;
import java.util.Map;

import com.project.AgadgoanApplication.model.Devotee;
import com.project.AgadgoanApplication.model.PangatBooking;

public interface PangatService {
    PangatBooking saveBooking(PangatBooking booking, Devotee devotee);
    List<PangatBooking> getAllBookings();
    PangatBooking updateBookingById(int id, PangatBooking updatedBooking);
    void deleteBookingById(int id);
    Map<String, Object> getSlotAvailability(String date, String timeSlot);
    List<PangatBooking> getBookingsByDevotee(Devotee devotee);
    int getBookedCount(String date, String timeSlot);
    
}

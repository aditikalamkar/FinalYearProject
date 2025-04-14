package com.project.AgadgoanApplication.services;

import java.util.List;
import java.util.Map;

import com.project.AgadgoanApplication.model.Devotee;
import com.project.AgadgoanApplication.model.PrasadBooking;

public interface PrasadService {

    PrasadBooking saveBooking(PrasadBooking booking, Devotee devotee);

    List<PrasadBooking> getAllBookings();

    PrasadBooking updateBookingById(int id, PrasadBooking updatedBooking);

    void deleteBookingById(int id);

    Map<String, Object> getSlotAvailability(String date, String timeSlot);

    List<PrasadBooking> getBookingsByDevotee(Devotee devotee);
    
    int getTotalBookedSeats(String date, String timeSlot);
}

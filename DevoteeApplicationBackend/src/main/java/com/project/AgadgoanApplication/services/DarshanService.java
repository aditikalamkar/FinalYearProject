package com.project.AgadgoanApplication.services;

import java.util.List;
import java.util.Map;

import com.project.AgadgoanApplication.model.DarshanBooking;
import com.project.AgadgoanApplication.model.Devotee;

public interface DarshanService {

    DarshanBooking saveBooking(DarshanBooking booking, Devotee devotee);
    List<DarshanBooking> getAllBookings();
    DarshanBooking updateBookingById(int id, DarshanBooking updatedBooking);
    void deleteBookingById(int id);
    Map<String, Object> getSlotAvailability(String date, String timeSlot);
    List<DarshanBooking> getBookingsByDevotee(Devotee devotee);
	int getTotalBookedSeats(String date, String timeSlot);
}

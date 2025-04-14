package com.project.AgadgoanApplication.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.AgadgoanApplication.dao.DarshanRepository;
import com.project.AgadgoanApplication.model.DarshanBooking;
import com.project.AgadgoanApplication.model.Devotee;

@Service
public class DarshanServiceImpl implements DarshanService {

    @Autowired
    private DarshanRepository repo;

    @Override
    public DarshanBooking saveBooking(DarshanBooking booking, Devotee devotee) {
        booking.setDevotee(devotee);
        return repo.save(booking);
    }

    @Override
    public List<DarshanBooking> getAllBookings() {
        return repo.findAll();
    }

    @Override
    public DarshanBooking updateBookingById(int id, DarshanBooking updatedBooking) {
        Optional<DarshanBooking> optionalBooking = repo.findById(id);
        if (optionalBooking.isPresent()) {
            DarshanBooking existing = optionalBooking.get();

            existing.setDate(updatedBooking.getDate());
            existing.setTimeSlot(updatedBooking.getTimeSlot());
            existing.setNoOfPeople(updatedBooking.getNoOfPeople());
            existing.setMessage(updatedBooking.getMessage());
            // Devotee remains unchanged

            return repo.save(existing);
        }
        return null;
    }

    @Override
    public void deleteBookingById(int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
        }
    }

    @Override
    public Map<String, Object> getSlotAvailability(String date, String timeSlot) {
        int totalSlots = 150; // Customize as needed
        int booked = repo.countByDateAndTimeSlot(date, timeSlot);

        Map<String, Object> result = new HashMap<>();
        result.put("total", totalSlots);
        result.put("booked", booked);
        result.put("available", totalSlots - booked);

        return result;
    }

    @Override
    public List<DarshanBooking> getBookingsByDevotee(Devotee devotee) {
        return repo.findByDevotee(devotee);
    }

    @Override
    public int getTotalBookedSeats(String date, String timeSlot) {
        List<DarshanBooking> bookings = repo.findByDateAndTimeSlot(date, timeSlot);
        return bookings.stream()
                .mapToInt(DarshanBooking::getNoOfPeople)
                .sum();

    }
    
}
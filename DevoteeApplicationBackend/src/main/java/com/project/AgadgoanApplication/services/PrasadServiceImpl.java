package com.project.AgadgoanApplication.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.AgadgoanApplication.dao.PrasadBookingRepository;
import com.project.AgadgoanApplication.model.PrasadBooking;
import com.project.AgadgoanApplication.model.Devotee;

@Service
public class PrasadServiceImpl implements PrasadService {

    @Autowired
    private PrasadBookingRepository repo;

    @Override
    public PrasadBooking saveBooking(PrasadBooking booking, Devotee devotee) {
        booking.setDevotee(devotee);
        return repo.save(booking);
    }

    @Override
    public List<PrasadBooking> getAllBookings() {
        return repo.findAll();
    }

    @Override
    public PrasadBooking updateBookingById(int id, PrasadBooking updatedBooking) {
        PrasadBooking existing = repo.findById(id).orElse(null);
        if (existing != null) {
            existing.setDate(updatedBooking.getDate());
            existing.setTimeSlot(updatedBooking.getTimeSlot());
            existing.setNoOfPeople(updatedBooking.getNoOfPeople());
            existing.setMessage(updatedBooking.getMessage());
            return repo.save(existing);
        }
        return null;
    }

    @Override
    public void deleteBookingById(int id) {
        repo.deleteById(id);
    }

    @Override
    public Map<String, Object> getSlotAvailability(String date, String timeSlot) {
        int totalSeats = 1500; // example capacity
        int bookedSeats = repo.getTotalBooked(date, timeSlot);
        int availableSeats = totalSeats - bookedSeats;

        Map<String, Object> slotInfo = new HashMap<>();
        slotInfo.put("totalSeats", totalSeats);
        slotInfo.put("bookedSeats", bookedSeats);
        slotInfo.put("availableSeats", availableSeats);
        return slotInfo;
    }

    @Override
    public List<PrasadBooking> getBookingsByDevotee(Devotee devotee) {
        return repo.findByDevotee(devotee);
    }

	@Override
	public int getTotalBookedSeats(String date, String timeSlot) {
		  return repo.getTotalBooked(date, timeSlot);
	}
	
	 
}

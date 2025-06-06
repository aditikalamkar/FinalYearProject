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

	private static final int MAX_CAPACITY = 150;
	
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
    public List<PrasadBooking> getBookingsByDevotee(Devotee devotee) {
        return repo.findByDevotee(devotee);
    }

    

    public int getAvailableSlots(String date, String timeSlot) {
        int booked = repo.getTotalPeopleBookedForSlot(date, timeSlot);
        return MAX_CAPACITY - booked;
    }
    
	
	
	 
}

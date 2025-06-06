package com.project.AgadgoanApplication.services;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.AgadgoanApplication.dao.PangatBookingRepository;
import com.project.AgadgoanApplication.model.Devotee;
import com.project.AgadgoanApplication.model.PangatBooking;

@Service
public class PangatServiceImpl implements PangatService {

	private static final int MAX_CAPACITY = 150;
	
    @Autowired
    private PangatBookingRepository repo;

    @Override
    public PangatBooking saveBooking(PangatBooking booking, Devotee devotee) {
        booking.setDevotee(devotee);
        return repo.save(booking);
    }

    @Override
    public List<PangatBooking> getAllBookings() {
        return repo.findAll();
    }

    @Override
    public PangatBooking updateBookingById(int id, PangatBooking updatedBooking) {
        Optional<PangatBooking> optionalBooking = repo.findById(id);
        if (optionalBooking.isPresent()) {
            PangatBooking existing = optionalBooking.get();

            existing.setDate(updatedBooking.getDate());
            existing.setTimeSlot(updatedBooking.getTimeSlot());
            existing.setNoOfPeople(updatedBooking.getNoOfPeople());
            existing.setAmount(updatedBooking.getAmount());
            existing.setDonation(updatedBooking.getDonation());
            existing.setMessage(updatedBooking.getMessage());
            // Devotee association stays the same

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
    public List<PangatBooking> getBookingsByDevotee(Devotee devotee) {
        return repo.findByDevotee(devotee);
    }
  
    @Override
	public int getAvailableSlots(String date, String timeSlot) {
		// TODO Auto-generated method stub
		int booked = repo.getTotalPeopleBookedForSlot(date, timeSlot);
		return MAX_CAPACITY - booked;
	}
}

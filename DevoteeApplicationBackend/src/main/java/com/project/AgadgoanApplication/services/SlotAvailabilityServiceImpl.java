package com.project.AgadgoanApplication.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.AgadgoanApplication.dao.DarshanRepository;
import com.project.AgadgoanApplication.model.SlotAvailability;

@Service
public class SlotAvailabilityServiceImpl  implements SlotAvailabilityService{
	 @Autowired

	    private DarshanRepository darshanRepository;

	    @Override
	    public SlotAvailability getDarshanSlotAvailability(String date, String timeSlot) {
	        Integer booked = darshanRepository.countPeopleByDateAndTimeSlot(date, timeSlot);
	        if (booked == null) booked = 0;

	        int totalSlots = 1500;
	        int available = totalSlots - booked;

	        return new SlotAvailability(date, timeSlot, totalSlots, booked, available);
	    }
}

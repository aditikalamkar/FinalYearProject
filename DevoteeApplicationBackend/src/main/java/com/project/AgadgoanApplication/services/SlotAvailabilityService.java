package com.project.AgadgoanApplication.services;

import com.project.AgadgoanApplication.model.SlotAvailability;

public interface SlotAvailabilityService {
    SlotAvailability getDarshanSlotAvailability(String date, String timeSlot);
}

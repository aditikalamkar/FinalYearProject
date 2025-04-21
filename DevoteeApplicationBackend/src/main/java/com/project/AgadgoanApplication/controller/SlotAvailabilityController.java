package com.project.AgadgoanApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.AgadgoanApplication.model.SlotAvailability;
import com.project.AgadgoanApplication.services.SlotAvailabilityService;
@RestController
public class SlotAvailabilityController {

    @Autowired
    private SlotAvailabilityService slotAvailabilityService;

    @GetMapping("/darshan/avaliabilty")
    public ResponseEntity<SlotAvailability> getDarshanSlotAvailability(
            @RequestParam String date,
            @RequestParam String timeSlot
    ) {
        SlotAvailability availability = slotAvailabilityService.getDarshanSlotAvailability(date, timeSlot);
        return ResponseEntity.ok(availability);
    }

}

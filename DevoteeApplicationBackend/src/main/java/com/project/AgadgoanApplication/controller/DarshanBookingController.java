package com.project.AgadgoanApplication.controller;

import com.project.AgadgoanApplication.model.DarshanBooking;
import com.project.AgadgoanApplication.model.Devotee;
import com.project.AgadgoanApplication.services.DarshanService;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController

//@CrossOrigin(origins = " \"http://localhost:4200\", \"http://3.80.55.195\"", allowCredentials = "true")
public class DarshanBookingController {

    @Autowired
    private DarshanService service;

    // ✅ Create booking (requires login)
    @PostMapping("/darshan/book")
    public ResponseEntity<?> createBooking(@RequestBody DarshanBooking booking, HttpSession session) {
        Devotee currentUser = (Devotee) session.getAttribute("user");

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Unauthorized: Please login to book Darshan."));
        }

        DarshanBooking savedBooking = service.saveBooking(booking, currentUser);
        return ResponseEntity.ok(Map.of("message", "Booking successful", "data", savedBooking));
    }

    // ✅ Get all bookings (public)
    @GetMapping("/darshan/all")
    public ResponseEntity<List<DarshanBooking>> getAllBookings() {
        return ResponseEntity.ok(service.getAllBookings());
    }

    // ✅ Update booking by ID (requires login)
    @PutMapping("/darshan/update/{id}")
    public ResponseEntity<?> updateBookingById(@PathVariable int id, @RequestBody DarshanBooking booking, HttpSession session) {
        Devotee currentUser = (Devotee) session.getAttribute("user");

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: Please login to update Darshan booking.");
        }

        DarshanBooking updated = service.updateBookingById(id, booking);
        if (updated != null) {
            return ResponseEntity.ok(Map.of("message", "Booking updated", "data", updated));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found with ID: " + id);
        }
    }

    // ✅ Delete booking by ID (requires login)
    @DeleteMapping("/darshan/delete/{id}")
    public ResponseEntity<?> deleteBookingById(@PathVariable int id, HttpSession session) {
        Devotee currentUser = (Devotee) session.getAttribute("user");

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: Please login to delete booking.");
        }

        service.deleteBookingById(id);
        return ResponseEntity.ok(Map.of("message", "Booking deleted successfully", "id", id));
    }

    @GetMapping("/darshan/availability")
    public ResponseEntity<Map<String, Integer>> getSlotAvailability(
            @RequestParam String date,
            @RequestParam String timeSlot) {

        int total = 1500;
        int booked = service.getTotalBookedSeats(date, timeSlot);

        Map<String, Integer> response = new HashMap<>();
        response.put("booked", booked);
        response.put("total", total);
        response.put("available", total - booked);

        return ResponseEntity.ok(response);
    }


    // ✅ Get bookings for logged-in user
    @GetMapping("/darshan/my-bookings")
    public ResponseEntity<?> getUserBookings(HttpSession session) {
        Devotee currentUser = (Devotee) session.getAttribute("user");

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: Please login to view your bookings.");
        }

        List<DarshanBooking> bookings = service.getBookingsByDevotee(currentUser);
        return ResponseEntity.ok(bookings);
    }
}

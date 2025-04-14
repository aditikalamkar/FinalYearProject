package com.project.AgadgoanApplication.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.project.AgadgoanApplication.model.Devotee;
import com.project.AgadgoanApplication.model.PrasadBooking;
import com.project.AgadgoanApplication.services.PrasadService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/prasad")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class PrasadBookingController {

    @Autowired
    private PrasadService service;

    // ✅ Create booking (requires login)
    @PostMapping("/book")
    public ResponseEntity<?> createBooking(@RequestBody PrasadBooking booking, HttpSession session) {
        Devotee currentUser = (Devotee) session.getAttribute("user");

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Unauthorized: Please login to book Prasad."));
        }

        PrasadBooking savedBooking = service.saveBooking(booking, currentUser);
        return ResponseEntity.ok(Map.of("message", "Booking successful", "data", savedBooking));
    }

    // ✅ Get all bookings (public)
    @GetMapping("/all")
    public ResponseEntity<List<PrasadBooking>> getAllBookings() {
        return ResponseEntity.ok(service.getAllBookings());
    }

    // ✅ Update booking by ID (requires login)
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBookingById(@PathVariable int id, @RequestBody PrasadBooking booking, HttpSession session) {
        Devotee currentUser = (Devotee) session.getAttribute("user");

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: Please login to update Prasad booking.");
        }

        PrasadBooking updated = service.updateBookingById(id, booking);
        if (updated != null) {
            return ResponseEntity.ok(Map.of("message", "Booking updated", "data", updated));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found with ID: " + id);
        }
    }

    // ✅ Delete booking by ID (requires login)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBookingById(@PathVariable int id, HttpSession session) {
        Devotee currentUser = (Devotee) session.getAttribute("user");

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: Please login to delete booking.");
        }

        service.deleteBookingById(id);
        return ResponseEntity.ok(Map.of("message", "Booking deleted successfully", "id", id));
    }

    // ✅ Check slot availability
    @GetMapping("/availability")
    public ResponseEntity<Map<String, Integer>> getTotalBooked(
            @RequestParam String date,
            @RequestParam String timeSlot) {

        int total = 1500;
        int booked = service.getTotalBookedSeats(date, timeSlot);

        Map<String, Integer> response = new HashMap<>();
        response.put("total", total);
        response.put("booked", booked);
        response.put("available", total - booked);

        return ResponseEntity.ok(response);
    }

    // ✅ Get bookings for logged-in user
    @GetMapping("/my-bookings")
    public ResponseEntity<?> getUserBookings(HttpSession session) {
        Devotee currentUser = (Devotee) session.getAttribute("user");

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: Please login to view your bookings.");
        }

        List<PrasadBooking> bookings = service.getBookingsByDevotee(currentUser);
        return ResponseEntity.ok(bookings);
    }
}

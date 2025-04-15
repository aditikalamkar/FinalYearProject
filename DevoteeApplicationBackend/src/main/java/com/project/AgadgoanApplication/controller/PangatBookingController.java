package com.project.AgadgoanApplication.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.project.AgadgoanApplication.model.Devotee;
import com.project.AgadgoanApplication.model.PangatBooking;
import com.project.AgadgoanApplication.services.PangatService;

import jakarta.servlet.http.HttpSession;

@RestController
//@CrossOrigin(origins = " \"http://localhost:4200\", \"http://3.80.55.195\"", allowCredentials = "true")
public class PangatBookingController {

    @Autowired
    private PangatService service;

    // ✅ Create booking (requires login)
    @PostMapping("/pangat/book")
    public ResponseEntity<?> createBooking(@RequestBody PangatBooking booking, HttpSession session) {
        Devotee currentUser = (Devotee) session.getAttribute("user");

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Unauthorized: Please login to book Pangat."));
        }

        PangatBooking savedBooking = service.saveBooking(booking, currentUser);
        return ResponseEntity.ok(Map.of("message", "Booking successful", "data", savedBooking));
    }

    // ✅ Get all bookings (public)
    @GetMapping("/pangat/all")
    public ResponseEntity<List<PangatBooking>> getAllBookings() {
        return ResponseEntity.ok(service.getAllBookings());
    }

    // ✅ Update booking by ID (requires login)
    @PutMapping("/pangat/update/{id}")
    public ResponseEntity<?> updateBookingById(@PathVariable int id, @RequestBody PangatBooking booking, HttpSession session) {
        Devotee currentUser = (Devotee) session.getAttribute("user");

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: Please login to update Pangat booking.");
        }

        PangatBooking updated = service.updateBookingById(id, booking);
        if (updated != null) {
            return ResponseEntity.ok(Map.of("message", "Booking updated", "data", updated));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found with ID: " + id);
        }
    }

    // ✅ Delete booking by ID (requires login)
    @DeleteMapping("/pangat/delete/{id}")
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
    @GetMapping("/pangat/availability")
    public ResponseEntity<Map<String, Object>> getSlotAvailability(
            @RequestParam String date,
            @RequestParam String timeSlot) {
        return ResponseEntity.ok(service.getSlotAvailability(date, timeSlot));
    }

    // ✅ Get bookings for logged-in user
    @GetMapping("/pangat/my-bookings")
    public ResponseEntity<?> getUserBookings(HttpSession session) {
        Devotee currentUser = (Devotee) session.getAttribute("user");

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: Please login to view your bookings.");
        }

        List<PangatBooking> bookings = service.getBookingsByDevotee(currentUser);
        return ResponseEntity.ok(bookings);
    }
}

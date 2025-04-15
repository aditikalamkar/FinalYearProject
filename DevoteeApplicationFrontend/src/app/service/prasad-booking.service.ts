import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrasadBookingService {
  private BASE_URL = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  // ✅ Create booking (requires login/session)
  createBooking(data: any) {
    return this.http.post(`${this.BASE_URL}/prasad/book`, data, { withCredentials: true });
  }

  // ✅ Get all bookings (public)
  getAllBookings(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/prasad/all`);
  }

  // ✅ Update booking by ID (not by name)
  updateBooking(id: number, data: any) {
    return this.http.put(`${this.BASE_URL}/prasad/update/${id}`, data, { withCredentials: true });
  }

  // ✅ Delete booking by ID
  deleteBooking(id: number) {
    return this.http.delete(`${this.BASE_URL}/prasad/delete/${id}`, { withCredentials: true });
  }

  // ✅ Check availability for a given date and time slot
  getSlotAvailability(date: string, timeSlot: string): Observable<{ booked: number; total: number }> {
    const params = new HttpParams().set('date', date).set('timeSlot', timeSlot);
    return this.http.get<{ booked: number; total: number }>(`${this.BASE_URL}/prasad/availability`, { params });
  }

  // ✅ Get bookings of the currently logged-in user
  getUserBookings(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/prasad/my-bookings`, { withCredentials: true });
  }
}

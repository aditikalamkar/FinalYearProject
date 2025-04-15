import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarshanBookingService {

  private BASE_URL = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  // Create a new Darshan booking
  createBooking(data: any) {
    return this.http.post(`${this.BASE_URL}/darshan/book`, data, { withCredentials: true });

  }

  // Fetch all bookings
  getAllBookings() {
    return this.http.get(`${this.BASE_URL}/darshan/all`);
  }

  // Update booking by ID (NOT name)
  updateBooking(id: number, data: any) {
    return this.http.put(`${this.BASE_URL}/darshan/update/${id}`, data, { withCredentials: true });
  }

  // Delete booking by ID (NOT name)
  deleteBooking(id: number) {
    return this.http.delete(`${this.BASE_URL}/darshan/delete/${id}`, { withCredentials: true });
  }

  // Get slot availability by date and timeSlot
  getSlotAvailability(date: string, timeSlot: string): Observable<{ booked: number; total: number; available: number }> {
    const params = new HttpParams().set('date', date).set('timeSlot', timeSlot);
    return this.http.get<{ booked: number; total: number; available: number }>(
      `${this.BASE_URL}/darshan/availability`, { params }
    );
  }

  checkAvailability(date: string, timeSlot: string): Observable<any> {
    const params = new HttpParams()
      .set('date', date)
      .set('timeSlot', timeSlot);

    return this.http.get<any>(`${this.BASE_URL}/darshan/availability`, { params });
  }
  

  getMyBookings() {
    return this.http.get(`${this.BASE_URL}/darshan/my-bookings`, { withCredentials: true });
  }

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PangatBookingService {

  private BASE_URL = 'http://localhost:8081/pangat';

  constructor(private http: HttpClient) { }

  // Create a new Pangat booking
  createBooking(data: any) {
    return this.http.post(`${this.BASE_URL}/book`, data,{ withCredentials: true });
  }

  // Fetch all bookings
  getAllBookings() {
    return this.http.get(`${this.BASE_URL}/all`);
  }

  // Update booking by devotee name
  updateBooking(name: string, data: any) {
    return this.http.put(`${this.BASE_URL}/update/${name}`, data);
  }

  // Delete booking by devotee name
  deleteBooking(name: string) {
    return this.http.delete(`${this.BASE_URL}/delete/${name}`);
  }

    // Get slot availability by date and timeSlot
    getSlotAvailability(date: string, timeSlot: string): Observable<{ booked: number; total: number; available: number }> {
      const params = new HttpParams().set('date', date).set('timeSlot', timeSlot);
      return this.http.get<{ booked: number; total: number; available: number }>(
        `${this.BASE_URL}/availability`,
        { params }
      );
    }
    
}

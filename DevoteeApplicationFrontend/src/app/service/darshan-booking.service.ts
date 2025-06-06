import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { DarshanBookingComponent } from '../Components/darshan-booking/darshan-booking.component';

@Injectable({
  providedIn: 'root'
})
export class DarshanBookingService {

   private BASE_URL = environment.apiUrl;
  // private BASE_URL ='http://localhost:8081';

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

  getMyBookings() {
    return this.http.get(`${this.BASE_URL}/darshan/my-bookings`, { withCredentials: true });
  }

  getDarshanSlotAvailability(date: string, timeSlot: string): Observable<any> {
    const params = new HttpParams()
      .set('date', date)
      .set('timeSlot', timeSlot);

    return this.http.get(`${this.BASE_URL}/darshan/availability`, { params });
  }

  getAvailableSlots(date: string, timeSlot:string){
    return this.http.get<number>(`${this.BASE_URL}/darshan/available`, {
      params :{date,timeSlot}
    })
  }
}

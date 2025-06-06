import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PrasadBookingService {
  private BASE_URL = environment.apiUrl;
  //  private BASE_URL = 'http://localhost:8081';

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

   getAvailableSlots(date: string, timeSlot:string){
    return this.http.get<number>(`${this.BASE_URL}/prasad/available`, {
      params :{date,timeSlot}
    })
  }

  // ✅ Get bookings of the currently logged-in user
  getUserBookings(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/prasad/my-bookings`, { withCredentials: true });
  }
}

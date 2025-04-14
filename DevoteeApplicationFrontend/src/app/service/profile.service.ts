import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/is-authenticated`, { withCredentials: true });
  }

  getDevoteeDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/profile/info`, { withCredentials: true });
  }

  getDarshanBookings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/darshan/my-bookings`, { withCredentials: true });
  }

  getPangatBookings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pangat/my-bookings`, { withCredentials: true });
  }


  getPrasadBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/prasad/my-bookings`, { withCredentials: true });
  }
  
  deleteBooking(booking: { id: number; type: string }): Observable<any> {
    let url = '';
    switch (booking.type) {
      case 'Darshan':
        url = `${this.baseUrl}/darshan/delete/${booking.id}`;
        break;
      case 'Pangat':
        url = `${this.baseUrl}/pangat/delete/${booking.id}`;
        break;
      case 'Prasad':
        url = `${this.baseUrl}/prasad/delete/${booking.id}`;
        break;
    }
    return this.http.delete(url, { withCredentials: true });
  }

  updateBooking(booking: any): Observable<any> {
    let url = '';
    switch (booking.type) {
      case 'Darshan':
        url = `${this.baseUrl}/darshan/update/${booking.id}`;
        break;
      case 'Pangat':
        url = `${this.baseUrl}/pangat/update/${booking.id}`;
        break;
      case 'Prasad':
        url = `${this.baseUrl}/prasad/update/${booking.id}`;
        break;
    }
    return this.http.put(url, booking, { withCredentials: true });
  }

}

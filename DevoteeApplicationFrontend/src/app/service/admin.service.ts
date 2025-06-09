import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface Booking {
  id: number;
  name: string;
  date: string;
  mobile: string;
  email: string;
  type: 'Pangat' | 'Prasad' | 'Darshan';
  timeSlot: string;
  noOfPeople: number;
  amount: number;
  donation?: number;
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.apiUrl ;

  //  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  checkSession(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/admin/check-session`, {
      withCredentials: true
    });
  }

  login(admin: AdminCredentials): Observable<string> {
    return this.http.post(`${this.baseUrl}/admin/login`, admin, {
      withCredentials: true,
      responseType: 'text'
    }).pipe(
      map(response => {
        localStorage.setItem('isAdminLoggedIn', 'true');
        return response;
      })
    );
  }

  isAdminLoggedIn(): boolean {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  }

  logout(): Observable<string> {
    localStorage.removeItem('isAdminLoggedIn');
    return this.http.post(`${this.baseUrl}/admin/logout`, {}, {
      withCredentials: true,
      responseType: 'text'
    });
  }

  getPangatBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/admin/pangat`, {
      withCredentials: true
    });
  }

  getPrasadBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/admin/prasad`, {
      withCredentials: true
    });
  }

  getDarshanBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/admin/darshan`, {
      withCredentials: true
    });
  }
}

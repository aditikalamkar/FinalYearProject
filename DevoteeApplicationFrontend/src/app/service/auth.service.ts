import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Devotee {
  name?: string;
  mobile?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8081'; // Backend URL

  constructor(private http: HttpClient) {}

  // Register a new user
  register(devotee: Devotee): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, devotee, {
      withCredentials: true,
      
    });
    

  }

  // Login
  login(devotee: Devotee): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, devotee, {
      withCredentials: true,
      responseType: 'text' // Since backend returns plain text
    });
  }

  // Logout
  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/logout`, {
      withCredentials: true,
      responseType: 'text' // Optional, if backend sends plain text
    });
  }

  // Check if user is logged in
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/is-authenticated`, {
      withCredentials: true
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService, Booking } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  pangatBookings: Booking[] = [];
  prasadBookings: Booking[] = [];
  darshanBookings: Booking[] = [];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.adminService.getPangatBookings().subscribe(data => this.pangatBookings = data);
    this.adminService.getPrasadBookings().subscribe(data => this.prasadBookings = data);
    this.adminService.getDarshanBookings().subscribe(data => this.darshanBookings = data);
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  isAdminLoggedIn(): boolean {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  }

  logout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, logout'
    }).then(result => {
      if (result.isConfirmed) {
        this.adminService.logout().subscribe(() => {
          localStorage.removeItem('isAdminLoggedIn');
          Swal.fire('Logged out!', 'You have been successfully logged out.', 'success').then(() => {
            this.router.navigate(['/']);
          });
        });
      }
    });
  }
}

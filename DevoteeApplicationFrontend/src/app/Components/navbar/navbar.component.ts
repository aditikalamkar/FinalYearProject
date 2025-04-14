import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userInfo: { name?: string; email?: string; mobile?: string } = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }


    goToBooking(page: string) {
      if (this.isLoggedIn) {
        this.router.navigate([`/${page}`]);
      } else {
        let actionText = page === 'booking' ? 'booking' : 'donation';
    
        Swal.fire({
          icon: 'warning',
          title: 'Login Required',
          text: `Devotee needs to login or register to access ${actionText}.`,
          confirmButtonText: 'OK',
          confirmButtonColor: '#e67e22'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        });        
      }
    }
    
  

  
  loadUserProfile(): void {
    this.profileService.getDevoteeDetails().subscribe({
      next: (data) => {
        this.isLoggedIn = true;
        this.userInfo = {
          name: data.name,
          email: data.email,
          mobile: data.mobile
        };
      },
      error: () => {
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
        
      }
    });
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
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe(() => {
          Swal.fire('Logged out!', 'You have been successfully logged out.', 'success').then(() => {
            this.isLoggedIn = false;
            window.location.href = '/';
          });
        });
      }
    });
  }
}

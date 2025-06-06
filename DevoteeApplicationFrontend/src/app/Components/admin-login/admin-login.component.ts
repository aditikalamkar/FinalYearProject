import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  admin = {
    username: '',
    password: ''
  };

  showPassword = false;
  errorMessage = '';

  constructor(private adminAuth: AdminService, private router: Router) {}

  ngOnInit(): void {
    if (this.adminAuth.isAdminLoggedIn()) {
      this.router.navigate(['/admin-dashboard']);
    }
  }

onSubmit(): void {
  if (!this.admin.username || !this.admin.password) {
    this.errorMessage = 'Username and password are required';
    return;
  }

  if (this.admin.username !== 'admin' || this.admin.password !== 'admin123') {
    this.errorMessage = 'Invalid admin credentials';
    return;
  }

  this.adminAuth.login(this.admin).subscribe(
    (res) => {
      localStorage.setItem('isAdminLoggedIn', 'true');
      this.router.navigate(['/admin-dashboard']);
    },
    (err) => {
      this.errorMessage = 'Login failed. Try again.';
    }
  );
}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}

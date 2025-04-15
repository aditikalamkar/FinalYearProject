import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login = {
    email: '',
    password: ''
  };
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  submitForm(form: any): void {
    if (form.valid) {
      this.authService.login(this.login).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'Welcome back!',
            confirmButtonColor: '#e67e22'
          }).then(() => {
            // Hard redirect to /home and refresh the page
            window.location.href = '';
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid email or password',
            confirmButtonColor: '#d33'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all fields correctly!',
        confirmButtonColor: '#d33'
      });
  
      // Mark fields as touched to show validation messages
      Object.values(form.controls).forEach((control: any) => control.markAsTouched());
    }
  }
  
}

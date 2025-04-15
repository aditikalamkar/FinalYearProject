import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = {
    name: '',
    mobile: '',
    email: '',
    password: ''
  };

  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  submitRegistration(form: any): void {
    if (form.valid) {
      this.authService.register(this.registerForm).subscribe({
        next: (res: any) => {
          Swal.fire('Success', res?.message || 'Registered successfully!', 'success').then(() => {
            window.location.href = '';
          });
        },
        error: (err: any) => {
          Swal.fire('Error', err?.error?.message || 'Registration failed', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Please fill all fields correctly.', 'error');
      Object.values(form.controls).forEach((control: any) => control.markAsTouched());
    }
  }
}

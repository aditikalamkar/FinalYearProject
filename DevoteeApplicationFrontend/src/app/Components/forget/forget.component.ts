import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent {

 

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      Swal.fire({
        title: 'Donation Page Live',
        text: 'This forget page functionality is in working mode.',
        icon: 'info',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);  // Redirect to login page
        }
      });
    }, 2000); // Trigger after 2 seconds
  }
  
}

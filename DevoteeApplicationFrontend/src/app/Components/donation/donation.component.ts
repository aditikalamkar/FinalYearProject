import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  ngOnInit(): void {
    setTimeout(() => {
      Swal.fire({
        title: 'Donation Page Live',
        text: 'This donation page is in working mode.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    }, 2000); // Trigger after 2 seconds
  }
}

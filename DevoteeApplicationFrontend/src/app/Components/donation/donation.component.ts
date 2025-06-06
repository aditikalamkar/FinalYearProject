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
      }).then(() => {
            // Hard redirect to /home and refresh the page
            window.location.href = '';
          });
    }, 1000); // Trigger after 2 seconds
  }
}

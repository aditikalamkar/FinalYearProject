import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PrasadBookingService } from 'src/app/service/prasad-booking.service';

@Component({
  selector: 'app-prasad-booking',
  templateUrl: './prasad-booking.component.html',
  styleUrls: ['./prasad-booking.component.css']
})
export class PrasadBookingComponent {
  booking = {
    date: '',
    timeSlot: '',
    noOfPeople: 1,
    message: '',
    donation: null,  // Optional donation
  };

  today = new Date().toISOString().split('T')[0];

  slotInfo = {
    booked: 0,
    total: null
  };
  showSlots = false;

  constructor(
    private prasadService: PrasadBookingService,
    private router: Router
  ) {}

  get slotsLeft() {
    return this.slotInfo.total !== null ? this.slotInfo.total - this.slotInfo.booked : 0;
  }

  updateAvailability() {
    const { date, timeSlot } = this.booking;
    if (date && timeSlot) {
      this.prasadService.getSlotAvailability(date, timeSlot).subscribe({
        next: (res: any) => {
          this.slotInfo.booked = res.booked;
          this.slotInfo.total = res.total;
        },
        error: () => {
          this.slotInfo = { booked: 0, total: null };
        }
      });
    }
  }

  
  submitForm(form: any) {
    if (form.valid) {
      this.prasadService.createBooking(this.booking).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Prasad Booking Confirmed!',
            confirmButtonColor: '#e67e22'
          }).then(() => this.router.navigate(['/profile']));

          form.resetForm();
          this.slotInfo = { booked: 0, total: null };
        },
        error: (err) => {
          console.error('Booking failed:', err);
          Swal.fire({
            icon: 'error',
            title: 'Booking failed',
            text: err?.error?.message || 'Something went wrong. Please try again later.',
            confirmButtonColor: '#e67e22'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Fill all required fields',
        confirmButtonColor: '#e67e22'
      });
    }
  }
}

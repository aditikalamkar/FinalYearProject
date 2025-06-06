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
    donation: null,
  };

  today = new Date().toISOString().split('T')[0];
  availableSlots: number | null = null;

  constructor(
    private prasadService: PrasadBookingService,
    private router: Router
  ) {}

  checkAvailability() {
    const { date, timeSlot } = this.booking;
    if (date && timeSlot) {
      this.prasadService.getAvailableSlots(date, timeSlot).subscribe({
        next: (slots) => this.availableSlots = slots,
        error: () => this.availableSlots = null
      });
    } else {
      this.availableSlots = null;
    }
  }

  submitForm(form: any) {
    if (form.valid) {
      if (this.booking.noOfPeople > 10) {
        Swal.fire({
          icon: 'error',
          title: 'Limit Exceeded',
          text: 'You can book a maximum of 10 people.',
          confirmButtonColor: '#e67e22'
        });
        return;
      }

      if (this.availableSlots !== null && this.booking.noOfPeople > this.availableSlots) {
        Swal.fire({
          icon: 'error',
          title: 'Slot Full',
          text: `Only ${this.availableSlots} slots left for this time.`,
          confirmButtonColor: '#e67e22'
        });
        return;
      }

      this.prasadService.createBooking(this.booking).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Prasad Booking Confirmed!',
            confirmButtonColor: '#e67e22'
          }).then(() => this.router.navigate(['/profile']));
          form.resetForm();
          this.availableSlots = null;
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

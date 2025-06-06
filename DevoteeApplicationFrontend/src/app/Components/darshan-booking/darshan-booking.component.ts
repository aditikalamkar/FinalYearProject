import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DarshanBookingService } from 'src/app/service/darshan-booking.service';

@Component({
  selector: 'app-darshan-booking',
  templateUrl: './darshan-booking.component.html',
  styleUrls: ['./darshan-booking.component.css']
})
export class DarshanBookingComponent {

  booking = {
    date: '',
    timeSlot: '',
    noOfPeople: 1,
    message: '',
    donation: null,
  };

  today = new Date().toISOString().split('T')[0];


  constructor(
    private service: DarshanBookingService,
    private router: Router
  ) {}



submitForm(form: any) {
  if (form.valid) {
    this.service.getAvailableSlots(this.booking.date, this.booking.timeSlot).subscribe({
      next: (availableSlots) => {
        if (this.booking.noOfPeople > 10) {
          Swal.fire({
            icon: 'error',
            title: 'Limit Exceeded',
            text: 'You can book a maximum of 10 people.',
            confirmButtonColor: '#e67e22'
          });
          return;
        }

        if (this.booking.noOfPeople > availableSlots) {
          Swal.fire({
            icon: 'error',
            title: 'Slot Full',
            text: `Only ${availableSlots} slots left for this time.`,
            confirmButtonColor: '#e67e22'
          });
          return;
        }

        // Proceed with booking if available
        this.service.createBooking(this.booking).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Darshan Booked!',
              text: 'Your darshan has been successfully booked.',
              confirmButtonColor: '#e67e22'
            }).then(() => {
              this.router.navigate(['/profile']);
            });
            form.resetForm();
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Booking Failed',
              text: 'Please try again later.',
              confirmButtonColor: '#e67e22'
            });
          }
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Availability Error',
          text: 'Could not check slot availability. Try again later.',
          confirmButtonColor: '#e67e22'
        });
      }
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Incomplete Form',
      text: 'Please fill all required fields correctly.',
      confirmButtonColor: '#e67e22'
    });
  }
}
  resetForm(form: any) {
    form.resetForm();
    this.booking = {
      date: '',
      timeSlot: '',
      noOfPeople: 1,
      message: '',
      donation: null,
    };
  }

  availableSlots: number | null = null;

checkAvailability() {
  const { date, timeSlot } = this.booking;

  if (date && timeSlot) {
    this.service.getAvailableSlots(date, timeSlot).subscribe({
      next: (slots) => {
        this.availableSlots = slots;
      },
      error: () => {
        this.availableSlots = null;
      }
    });
  } else {
    this.availableSlots = null;
  }
}

}

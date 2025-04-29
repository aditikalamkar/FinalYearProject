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

  slotAvailability: {
    total: number;
    bookedSlots: number;
    availableSlots: number;
  } | null = null;
// noOfPeople: any;

  constructor(
    private service: DarshanBookingService,
    private router: Router
  ) {}

  checkAvailability() {
    if (!this.booking.date || !this.booking.timeSlot) {
      alert('Please select both date and time slot.');
      return;
    }

    this.service.getDarshanSlotAvailability(this.booking.date, this.booking.timeSlot)
      .subscribe({
        next: (data) => {
          this.slotAvailability = {
            total: data.totalSlots,
            bookedSlots: data.bookedSlots,
            availableSlots: data.availableSlots
          };
        },
        error: (err) => {
          console.error(err);
          alert('Failed to fetch slot availability.');
        }
      });
  }

  submitForm(form: any) {
    if (form.valid) {
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
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Form',
        text: 'Please fill all required fields correctly.',
        confirmButtonColor: '#e67e22'
      });
    }
  }
}

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
    numberOfPeople: 0,
    message: '',
    donation: null,  // Optional donation
  };

  today = new Date().toISOString().split('T')[0];

  slotInfo = {
    booked: 0,
    total: null
  };

  constructor(
    private service: DarshanBookingService,
    private router: Router
  ) {}

  // Calculates available slots
  get slotsLeft() {
    return this.slotInfo.total !== null
      ? this.slotInfo.total - this.slotInfo.booked
      : 0;
  }

  // Fetch updated slot availability when date or time slot changes
  updateAvailability() {
    const { date, timeSlot } = this.booking;
    if (date && timeSlot) {
      this.service.getSlotAvailability(date, timeSlot).subscribe({
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

  // Submit booking form
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
            this.router.navigate(['/profile']); // Navigate post-booking
          });

          form.resetForm();
          this.slotInfo = { booked: 0, total: null };
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

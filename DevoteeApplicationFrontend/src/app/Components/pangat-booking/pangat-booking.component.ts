import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PangatBookingService } from 'src/app/service/pangat-booking.service';

@Component({
  selector: 'app-pangat-booking',
  templateUrl: './pangat-booking.component.html',
  styleUrls: ['./pangat-booking.component.css'],
})
export class PangatBookingComponent {
  booking = {
    date: '',
    timeSlot: '',
    noOfPeople: 1,
    amount: 3500,
    baseAmount: 3500,
    donation: null,
    message: ''
  };

  today = new Date().toISOString().split('T')[0];

  availableSlots: number | null = null;

  constructor(
    private pangatService: PangatBookingService,
    private router: Router
  ) {}

  // Just updating UI — actual amount is used for display only
  calculateAmount() {
    this.booking.amount = this.booking.noOfPeople * this.booking.baseAmount;
  }

  checkAvailability() {
    const { date, timeSlot } = this.booking;

    if (date && timeSlot) {
      this.pangatService.getAvailableSlots(date, timeSlot).subscribe({
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

  submitForm(form: any) {
    if (form.valid) {
      this.pangatService.getAvailableSlots(this.booking.date, this.booking.timeSlot).subscribe({
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

          // Proceed with booking
          this.pangatService.createBooking(this.booking).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Pangat Booked!',
                text: 'Your seva has been successfully booked.',
                confirmButtonColor: '#e67e22',
              }).then(() => {
                this.router.navigate(['/profile']);
              });

              form.resetForm();
              this.booking = {
                date: '',
                timeSlot: '',
                noOfPeople: 1,
                amount: 3500,
                baseAmount: 3500,
                donation: null,
                message: ''
              };
              this.availableSlots = null;
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Booking failed!',
                text: 'Something went wrong. Please try again.',
                confirmButtonColor: '#e67e22',
              });
              console.error('Booking error:', err);
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
        title: 'Please fill all required fields correctly.',
        confirmButtonColor: '#e67e22',
      });
    }
  }
}

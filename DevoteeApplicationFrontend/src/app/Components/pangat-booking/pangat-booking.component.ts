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
    noOfPeople: 0,
    amount: 3500, // Base per-person amount
    baseAmount: 3500, 
    donation: null,  // Optional donation
    message: ''
  };

  today = new Date().toISOString().split('T')[0];

  slotInfo = {
    booked: 0,
    total: null,
    available: 0 
  };
  showSlots = false;

  constructor(
    private pangatService: PangatBookingService,
    private router: Router
  ) {}

  get slotsLeft() {
    return this.slotInfo.total !== null ? this.slotInfo.total - this.slotInfo.booked : 0;
  }


updateAvailability() {
  const { date, timeSlot } = this.booking;
  if (date && timeSlot) {
    this.pangatService.getSlotAvailability(date, timeSlot).subscribe({
      next: (res: any) => {
        this.slotInfo.booked = res.booked;
        this.slotInfo.total = res.total;
        this.slotInfo.available = res.available; // ← Directly use 'available' from backend
      },
      error: () => {
        this.slotInfo = { booked: 0, total: null, available: 0 };
      }
    });
  }
}

  
  
  // Just updating UI — actual amount is used for display only
  calculateAmount() {
    this.booking.amount = this.booking.noOfPeople * this.booking.baseAmount;
  }

  submitForm(form: any) {
    if (form.valid) {
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
          this.slotInfo = { booked: 0, total: null,available: 0  };
          this.showSlots = false;
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Booking failed!',
            text: 'Something went wrong. Please try again.',
            confirmButtonColor: '#e67e22',
          });
          console.error('Booking error:', err);
        },
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

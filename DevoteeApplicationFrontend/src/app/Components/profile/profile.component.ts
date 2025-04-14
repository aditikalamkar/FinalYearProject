import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: any = null;
  allBookings: any[] = [];

  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Load user profile details (name, email, mobile)
  loadUserProfile(): void {
    this.profileService.getDevoteeDetails().subscribe({
      next: (data) => {
        this.isLoggedIn = true;
        this.userInfo = {
          name: data.name,
          email: data.email,
          mobile: data.mobile
        };
        this.loadAllBookings(); // After loading user profile, fetch the bookings
      },
      error: () => {
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      }
    });
  }

  // Load all types of bookings (Darshan, Pangat, Prasad)
  loadAllBookings(): void {
    this.allBookings = []; // Clear existing bookings

    // Fetch Darshan bookings
    this.profileService.getDarshanBookings().subscribe({
      next: (data) => {
        const darshan = (data || []).map((d: any) => ({
          date: d.date,
          type: 'Darshan',
          timeSlot: d.timeSlot,
          numberOfPeople: d.numberOfPeople || d.noOfPeople || 1,

          donation: d.donation || 0,
          pangatAmount: null, // Darshan does not have Pangat amount
          id: d.id
        }));
        this.allBookings.push(...darshan);
      }
    });

    // Fetch Pangat bookings
    this.profileService.getPangatBookings().subscribe({
      next: (data) => {
        const pangat = (data || []).map((p: any) => ({
          date: p.date,
          type: 'Pangat',
          timeSlot: p.timeSlot,
          numberOfPeople: p.noOfPeople || 1,
          donation: p.donation  || 0,
          pangatAmount: (p.noOfPeople || 1) * 3500,
          id: p.id
        }));
        this.allBookings.push(...pangat);
      }
    });

    // Fetch Prasad bookings
    this.profileService.getPrasadBookings().subscribe({
      next: (data) => {
        const prasad = (data || []).map((p: any) => ({
          date: p.date,
          type: 'Prasad',
          timeSlot: p.timeSlot,
          numberOfPeople: p.noOfPeople || 1,
          donation: p.donation || 0,
          pangatAmount: null, // Prasad does not have Pangat amount
          id: p.id
        }));
        this.allBookings.push(...prasad);
      },
      error: (err) => {
        console.error('Failed to fetch Prasad bookings:', err);
      }
    });
  }

  // Logout confirmation
  confirmLogout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe(() => {
          Swal.fire({
            title: 'Logged Out!',
            text: 'You have been successfully logged out.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
          window.location.href = '/home';
        });
      }
    });
  }

  // Edit booking functionality
  editBooking(booking: any): void {
    Swal.fire({
      title: 'Edit Booking',
      html: `
        <label for="date">📅 Date</label>
        <input type="date" id="date" class="swal2-input" value="${booking.date}">

        <label for="type">📌 Type</label>
        <input type="text" id="type" class="swal2-input" value="${booking.type}" readonly>

        <label for="timeSlot">⏰ Time Slot</label>
        <input type="text" id="timeSlot" class="swal2-input" value="${booking.timeSlot}">

        <label for="item">🍽️ Item / Meal / Prasad</label>
        <input type="text" id="item" class="swal2-input" value="${booking.item || ''}">

        <label for="people">👥 People</label>
        <input type="number" id="people" class="swal2-input" value="${booking.numberOfPeople || 1}">

        <label for="amount">💰 Donation Amount (₹)</label>
        <input type="number" id="amount" class="swal2-input" value="${booking.donation || 0}">

        ${booking.type === 'Pangat' ? `
        <label for="pangAmount">💰 Pangat Amount (₹)</label>
        <input type="number" id="pangAmount" class="swal2-input" value="${booking.pangatAmount || 0}">
        ` : ''}
      `,
      focusConfirm: false,
      preConfirm: () => {
        const date = (document.getElementById('date') as HTMLInputElement).value;
        const type = (document.getElementById('type') as HTMLInputElement).value;
        const timeSlot = (document.getElementById('timeSlot') as HTMLInputElement).value;
        const item = (document.getElementById('item') as HTMLInputElement).value;
        const people = (document.getElementById('people') as HTMLInputElement).value;
        const amount = (document.getElementById('amount') as HTMLInputElement).value;
        const pangatAmount = booking.type === 'Pangat' ? (document.getElementById('pangAmount') as HTMLInputElement).value : null;

        if (!date || !type || !timeSlot || !people || !amount) {
          Swal.showValidationMessage('Please fill out all required fields');
          return false;
        }

        return {
          ...booking,
          date,
          timeSlot,
          item,
          numberOfPeople: +people,
          donation: +amount,
          pangatAmount: pangatAmount ? +pangatAmount : null
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const updatedBooking = result.value;
        this.profileService.updateBooking(updatedBooking).subscribe({
          next: () => {
            Swal.fire('Updated!', 'Booking has been updated.', 'success');
            this.loadAllBookings(); // Refresh data
          },
          error: () => {
            Swal.fire('Error', 'Failed to update booking.', 'error');
          }
        });
      }
    });
  }

  // Delete booking functionality
  deleteBooking(booking: { id: number; type: string }): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `This will delete the ${booking.type} booking.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then(result => {
      if (result.isConfirmed) {
        this.profileService.deleteBooking(booking).subscribe({
          next: () => {
            Swal.fire('Deleted!', `${booking.type} booking has been deleted.`, 'success');
            this.loadAllBookings(); // Refresh list after deletion
          },
          error: (err: any) => {
            console.error('Delete failed:', err);
            Swal.fire('Error!', 'Could not delete the booking.', 'error');
          }
        });
      }
    });
  }
}

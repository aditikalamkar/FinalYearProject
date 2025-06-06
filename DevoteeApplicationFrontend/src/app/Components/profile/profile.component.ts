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

  darshanTimeSlots = ['6:00 AM - 7:00 AM', '7:00 AM - 8:00 AM', '8:00 AM - 9:00 AM'];
  pangatTimeSlots = ['11:00 AM - 12:00 PM', '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM'];
  prasadTimeSlots = ['5:00 PM - 6:00 PM', '6:00 PM - 7:00 PM', '7:00 PM - 8:00 PM'];

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.profileService.getDevoteeDetails().subscribe({
      next: (data) => {
        this.isLoggedIn = true;
        this.userInfo = {
          name: data.name,
          email: data.email,
          mobile: data.mobile
        };
        this.loadAllBookings();
      },
      error: () => {
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      }
    });
  }

  loadAllBookings(): void {
    this.allBookings = [];

    this.profileService.getDarshanBookings().subscribe({
      next: (data) => {
        const darshan = (data || []).map((d: any) => ({
          id: d.id,
          date: d.date,
          type: 'Darshan',
          timeSlot: d.timeSlot,
          numberOfPeople: d.numberOfPeople || d.noOfPeople || 1,
          donation: d.donation || 0,
          pangatAmount: null,
          item: d.item || ''
        }));
        this.allBookings.push(...darshan);
      }
    });

    this.profileService.getPangatBookings().subscribe({
      next: (data) => {
        const pangat = (data || []).map((p: any) => ({
          id: p.id,
          date: p.date,
          type: 'Pangat',
          timeSlot: p.timeSlot,
          numberOfPeople: p.noOfPeople || 1,
          donation: p.donation || 0,
          pangatAmount: (p.noOfPeople || 1) * 3500,
          item: p.item || ''
        }));
        this.allBookings.push(...pangat);
      }
    });

    this.profileService.getPrasadBookings().subscribe({
      next: (data) => {
        const prasad = (data || []).map((p: any) => ({
          id: p.id,
          date: p.date,
          type: 'Prasad',
          timeSlot: p.timeSlot,
          numberOfPeople: p.noOfPeople || 1,
          donation: p.donation || 0,
          pangatAmount: null,
          item: p.item || ''
        }));
        this.allBookings.push(...prasad);
      },
      error: (err) => {
        console.error('Failed to fetch Prasad bookings:', err);
      }
    });
  }

  getTimeSlotOptions(type: string): string {
    let slots: string[] = [];
    if (type === 'Darshan') slots = this.darshanTimeSlots;
    else if (type === 'Pangat') slots = this.pangatTimeSlots;
    else if (type === 'Prasad') slots = this.prasadTimeSlots;
    else slots = [];

    return slots.map(slot => `<option value="${slot}">${slot}</option>`).join('');
  }

editBooking(booking: any): void {
  Swal.fire({
    title: 'Edit Booking',
    html: `
      <div class="swal-custom-form">
        <label class="custom-label" for="date">📅 Date</label>
        <input type="date" id="date" class="swal2-input custom-input" value="${booking.date}">

        <label class="custom-label" for="type">📌 Type</label>
        <select id="type" class="swal2-select custom-input">
          <option value="Darshan" ${booking.type === 'Darshan' ? 'selected' : ''}>Darshan</option>
          <option value="Pangat" ${booking.type === 'Pangat' ? 'selected' : ''}>Pangat</option>
          <option value="Prasad" ${booking.type === 'Prasad' ? 'selected' : ''}>Prasad</option>
        </select>

        <label class="custom-label" for="timeSlot">⏰ Time Slot</label>
        <select id="timeSlot" class="swal2-select custom-input">
          ${this.getTimeSlotOptions(booking.type).replace(
            `value="${booking.timeSlot}"`,
            `value="${booking.timeSlot}" selected`
          )}
        </select>

        <label class="custom-label" for="item">🍽️ Item / Meal / Prasad</label>
        <input type="text" id="item" class="swal2-input custom-input" value="${booking.item || ''}">

        <label class="custom-label" for="people">👥 People</label>
        <input type="number" id="people" class="swal2-input custom-input" min="1" value="${booking.numberOfPeople || 1}">

        <label class="custom-label" for="amount">💰 Donation Amount (₹)</label>
        <input type="number" id="amount" class="swal2-input custom-input" min="0" value="${booking.donation || 0}">

        ${booking.type === 'Pangat' ? `
          <label class="custom-label" for="pangAmount">💰 Pangat Amount (₹)</label>
          <input type="number" id="pangAmount" class="swal2-input custom-input" min="0" value="${booking.pangatAmount || 0}">
        ` : ''}
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Update',
    cancelButtonText: 'Cancel',
    customClass: {
      popup: 'custom-swal-popup',
      confirmButton: 'custom-confirm-btn',
      cancelButton: 'custom-cancel-btn'
    },
    didOpen: () => {
      const typeSelect = document.getElementById('type') as HTMLSelectElement;
      const timeSlotSelect = document.getElementById('timeSlot') as HTMLSelectElement;

      typeSelect.addEventListener('change', () => {
        let slots: string[] = [];
        const selectedType = typeSelect.value;

        if (selectedType === 'Darshan') slots = this.darshanTimeSlots;
        else if (selectedType === 'Pangat') slots = this.pangatTimeSlots;
        else if (selectedType === 'Prasad') slots = this.prasadTimeSlots;

        timeSlotSelect.innerHTML = '';

        slots.forEach(slot => {
          const option = document.createElement('option');
          option.value = slot;
          option.text = slot;
          timeSlotSelect.appendChild(option);
        });
      });
    },
    preConfirm: () => {
      const date = (document.getElementById('date') as HTMLInputElement).value;
      const type = (document.getElementById('type') as HTMLSelectElement).value;
      const timeSlot = (document.getElementById('timeSlot') as HTMLSelectElement).value;
      const item = (document.getElementById('item') as HTMLInputElement).value;
      const peopleStr = (document.getElementById('people') as HTMLInputElement).value;
      const amountStr = (document.getElementById('amount') as HTMLInputElement).value;
      const pangatAmountStr = type === 'Pangat' ? (document.getElementById('pangAmount') as HTMLInputElement)?.value : null;

      if (!date || !type || !timeSlot || !peopleStr || !amountStr) {
        Swal.showValidationMessage('Please fill out all required fields');
        return false;
      }

      const people = Number(peopleStr);
      const amount = Number(amountStr);
      const pangatAmount = pangatAmountStr ? Number(pangatAmountStr) : null;

      if (people < 1 || amount < 0 || (type === 'Pangat' && (pangatAmount === null || pangatAmount < 0))) {
        Swal.showValidationMessage('Please enter valid numeric values');
        return false;
      }

      return {
        ...booking,
        date,
        type,
        timeSlot,
        item,
        numberOfPeople: people,
        donation: amount,
        pangatAmount: type === 'Pangat' ? pangatAmount : null
      };
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      const updatedBooking = result.value;
      this.profileService.updateBooking(updatedBooking).subscribe({
        next: () => {
          Swal.fire({
            title: 'Updated!',
            text: 'Booking has been updated.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            this.loadAllBookings(); // refresh profile component
            this.router.navigate(['/profile']);
          });
        },
        error: () => {
          Swal.fire('Error', 'Failed to update booking.', 'error');
        }
      });
    }
  });
}


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
            this.loadAllBookings(); // Refresh list
          },
          error: (err) => {
            console.error('Delete failed:', err);
            Swal.fire('Error!', 'Could not delete the booking.', 'error');
          }
        });
      }
    });
  }

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
          window.location.href = '';
        });
      }
    });
  }
}

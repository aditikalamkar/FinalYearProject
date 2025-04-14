import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DonationComponent } from './Components/donation/donation.component';
import { ForgetComponent } from './Components/forget/forget.component';
import { ContactComponent } from './Components/contact/contact.component';
import { PangatBookingComponent } from './Components/pangat-booking/pangat-booking.component';
import { PrasadBookingComponent } from './Components/prasad-booking/prasad-booking.component';
import { DarshanBookingComponent } from './Components/darshan-booking/darshan-booking.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

// ✅ Import AuthGuard


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget', component: ForgetComponent },
  { path: 'contact', component: ContactComponent },

  // ✅ Protected Routes
  { path: 'donation', component: DonationComponent, canActivate: [AuthGuard] },
  { path: 'Pangat-Booking', component: PangatBookingComponent, canActivate: [AuthGuard] },
  { path: 'Prasad-Booking', component: PrasadBookingComponent, canActivate: [AuthGuard] },
  { path: 'darshan-booking', component: DarshanBookingComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '' } // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DonationComponent } from './Components/donation/donation.component';
import { ForgetComponent } from './Components/forget/forget.component';
import { ContactComponent } from './Components/contact/contact.component';
import { PangatBookingComponent } from './Components/pangat-booking/pangat-booking.component';
import { PrasadBookingComponent } from './Components/prasad-booking/prasad-booking.component';

import { HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { AuthService } from './service/auth.service';
import { ResertPasswordComponent } from './Components/resert-password/resert-password.component';
import { DarshanBookingComponent } from './Components/darshan-booking/darshan-booking.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { EditBookingDialogComponent } from './Components/edit-booking-dialog/edit-booking-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DonationComponent,
    ForgetComponent,
    ContactComponent,
    PangatBookingComponent,
    PrasadBookingComponent,
    ResertPasswordComponent,
    DarshanBookingComponent,
    ProfileComponent,
    EditBookingDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

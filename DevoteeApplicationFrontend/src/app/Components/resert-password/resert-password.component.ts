import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-resert-password',
  templateUrl: './resert-password.component.html',
  styleUrls: ['./resert-password.component.css']
})
export class ResertPasswordComponent {



  constructor(private authService: AuthService, private router: Router) {}

 
}

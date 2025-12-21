import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
// import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'travlr-admin';
  constructor(public auth: AuthenticationService, private router: Router) {}
  logout() { this.auth.logout(); this.router.navigateByUrl('/'); }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form = { name: '', email: '', password: '' };
  error = '';

  constructor(private auth: AuthenticationService, private router: Router) {}

  submit() {
    this.error = '';
    this.auth.register(this.form as any).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (e) => this.error = e?.error?.message || 'Registration failed',
    });
  }
}

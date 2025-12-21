import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = { email: '', password: '' };
  error = '';

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  submit() {
    this.error = '';
    this.auth.login(this.form).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: (e) => this.error = e?.error?.message || 'Login failed',
    });
  }
}

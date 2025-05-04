import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [CommonModule, FormsModule]
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {
    this.authService.signup(this.email, this.password, this.username).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.error.message || 'Signup failed';
      }
    });
  }
}

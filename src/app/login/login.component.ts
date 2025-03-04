import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Make sure this path is correct
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, // Import FormsModule here
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    CommonModule // Import CommonModule here
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = signal<boolean>(true); // To control password visibility
  email = signal<string>(''); // To capture email input
  password = signal<string>(''); // To capture password input
  isShaking = signal<boolean>(false)

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  clickEvent(event: MouseEvent): void {
    this.hide.set(!this.hide()); // Toggle the hide value
    event.stopPropagation();
  }

  login() {
    const emailValue = this.email(); // Get the email signal value
    const passwordValue = this.password(); // Get the password signal value
  
    this.authService.login(emailValue, passwordValue).subscribe({
      next: (response) => {
        const token = response.token; // Feltételezzük, hogy a válaszban a token van
        console.log('Received token:', token); // Itt látod a tokent a konzolban
        this.authService.setSession(token); // Token mentése
        this.router.navigate(['/home']); // Navigate to a protected route after login
      },
      error: (error) => {
        console.error('Login failed', error);
        this.snackBar.open(
          error?.error?.message || 'Login failed. Please try again.', 
          'Close', 
          { duration: 5000 }
        );
        // Trigger shake animation
      this.isShaking.set(true);
      setTimeout(() => {
        this.isShaking.set(false);
      }, 800);
      },
      complete: () => {
        console.log('Login request completed');
      }
    });
  }
}
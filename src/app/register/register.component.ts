import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Reactive Forms
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Reactive form initialization
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      nickname: [''],
      company: ['']
    }, { validators: this.passwordsMatchValidator });

    // Folyamatosan figyeli a form státuszát és frissíti a validációt
    this.registerForm.statusChanges.subscribe(() => {
      this.checkPasswordMismatch();
    });
  }

  // Validator to check if passwords match
  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  // Ellenőrzi, hogy van-e mismatch hiba és frissíti a statuszt
  checkPasswordMismatch() {
    const confirmPasswordControl = this.registerForm.get('confirmPassword');
    if (confirmPasswordControl && this.registerForm.hasError('mismatch')) {
      confirmPasswordControl.setErrors({ mismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }

  // Toggle password visibility
  togglePasswordVisibility(event: Event) {
    event.preventDefault(); // Prevent the form submit event
    this.hidePassword = !this.hidePassword;
  }

  // Submit form
  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const user = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      nickname: this.registerForm.value.nickname,
      comapny: this.registerForm.value.company
    };

    this.authService.register(user).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }

  // Helper to check if the form has a password mismatch error
  get passwordMismatch() {
    return this.registerForm.hasError('mismatch') && this.registerForm.get('confirmPassword')?.touched;
  }
}
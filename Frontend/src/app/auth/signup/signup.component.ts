import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true ,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule, ReactiveFormsModule,CommonModule]
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signup() {
    if (this.signupForm.invalid) {
      this.errorMessage = 'All fields are required';
      return;
    }

    const { username, password } = this.signupForm.value;
    this.authService.signup(username, password).subscribe(success => {
      if (success) {
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Signup failed';
      }
    });
  }
}
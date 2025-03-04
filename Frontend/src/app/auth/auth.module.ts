import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,       
    ReactiveFormsModule,
    LoginComponent,
    SignupComponent
  ]
})
export class AuthModule { }
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;
  otpSent:boolean=false
  constructor(private fb: FormBuilder,private service:AuthService,private snackBar:SnackbarService,private router:Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      otp: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)]]
    });
  }

  getOtp() {
    if (this.forgotPasswordForm?.get('email')?.value) {
    
      this.service.sendOtp(this.forgotPasswordForm.get('email')?.value).pipe(
        catchError((error) => {
          console.error('OTP sending failed:', error?.error?.message);
          this.snackBar.showError(`OTP sending failed....Error:${error?.error?.message || 'Unknown error'}`);
          this.forgotPasswordForm.reset()
          return throwError(() => error);
        })
      ).subscribe(() => {
        this.snackBar.showSuccess('OTP sent successfully');
        this.otpSent = true; 
      });
    }
  }

  resetPassword() {
    if(this.forgotPasswordForm.valid){
      this.service.resetpassword(this.forgotPasswordForm.value).pipe(
        catchError((error) => {
          console.error('Password reset Failed:', error?.error?.message);
          this.snackBar.showError(`Password reset Failed....Error:${error?.error?.message || 'Unknown error'}`);
          this.forgotPasswordForm.reset()
          return throwError(() => error);
        })
      ).subscribe(() => {
        this.snackBar.showSuccess('Password reset successfully');
        this.router.navigate(['login'])
      });
    }
  }
}

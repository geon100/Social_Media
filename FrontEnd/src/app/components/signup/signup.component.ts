import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { RegisterUser } from 'src/app/models/auth.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;
  otpSent:boolean=false

  constructor(private fb: FormBuilder, private service: AuthService, private router: Router, private snackBar: SnackbarService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/), this.matchPassword.bind(this)]],
      dob: [null, [Validators.required, this.ageValidator(13)]],
      otp:['',Validators.required]
    });
  }

  matchPassword(control: AbstractControl): { [key: string]: boolean } | null {
    const password = this.signupForm?.get('password')?.value;
    const confirmPassword = control?.value;

    return password === confirmPassword ? null : { 'mismatch': true };
  }

  ageValidator(minAge: number) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const birthDate = control.value;
      if (!birthDate) {
        return null;
      }

      const today = new Date();
      const age = today.getFullYear() - new Date(birthDate).getFullYear();

      return age >= minAge ? null : { 'minAge': true };
    };
  }

  getOtp() {
    if (this.signupForm?.get('email')?.value) {
    
      this.service.sendOtp(this.signupForm.get('email')?.value).pipe(
        catchError((error) => {
          console.error('OTP sending failed:', error?.error?.message);
          this.snackBar.showError(`OTP sending failed....Error:${error?.error?.message || 'Unknown error'}`);
          this.signupForm.reset()
          return throwError(() => error);
        })
      ).subscribe(() => {
        this.snackBar.showSuccess('OTP sent successfully');
        this.otpSent = true; // Set the flag to true after sending OTP

        this.timer()
      });
    }
  }
  private timer(){
    setTimeout(() => {
      this.snackBar.showError('Otp Expired')
      this.otpSent = false;
    }, 30000);
  }
  signup() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value)
      const userObj:RegisterUser={
        fullName: this.signupForm.value.fullName,
        userName: this.signupForm.value.userName,
        password: this.signupForm.value.password,
        email: this.signupForm.value.email,
        dob: this.signupForm.value.dob,
        otp:this.signupForm.value.otp
      }
      // const otp=this.signupForm.value.otp
      this.service.signup(userObj).pipe(
        catchError((error) => {
          console.error('Signup failed:', error?.error?.message);
          this.snackBar.showError(`Signup failed....Error:${error?.error?.message || 'Unknown error'}`)
          return throwError(() => error);
        })
      ).subscribe((response) => {
        if (response.status) {
          console.log('Signup successful:', response);
        }
        this.snackBar.showSuccess('Signup Successful')
        this.router.navigate(['login']);
      });
    }
  }
}

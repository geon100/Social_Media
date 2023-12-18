import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder,private service:AuthService,private router:Router,private snackBar:SnackbarService) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)]],
    });
  }
  
  login() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).pipe(
        catchError((error) => {
          console.error('Login failed:', error?.error?.message);
          this.snackBar.showError(`Login failed....Error:${error?.error?.message || 'Unknown error'}`)
          return throwError(() => error); 
        })
      ).subscribe((response) => {
        // Success case
        localStorage.setItem('userToken', response?.token);
        this.snackBar.showSuccess('Login Successful')
        this.router.navigate(['']);
      });
    }
  }

}

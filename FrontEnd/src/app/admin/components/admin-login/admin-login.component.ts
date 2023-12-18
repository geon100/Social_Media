import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private service:AdminService,private snackBar:SnackbarService,private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  

  onSubmit(): void {
    if (this.loginForm.valid) {
      if (this.loginForm.valid) {
        this.service.login(this.loginForm.value).pipe(
          catchError((error) => {
            console.error('Login failed:', error?.error?.message);
            this.snackBar.showError(`Login failed....Error:${error?.error?.message || 'Unknown error'}`)
            return throwError(() => error); 
          })
        ).subscribe((response) => {
          localStorage.setItem('adminToken', response?.token);
          this.snackBar.showSuccess('Login Successful')
          this.router.navigate(['admin/dashboard']);
        });
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

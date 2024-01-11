import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackBar: SnackbarService, private service: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.error.message;

        if (error.status === 401 && message !== 'Invalid credentials') {
          return this.service.refreshToken().pipe(
            switchMap(res => {
              if (res.token) {
                localStorage.setItem('userToken', res.token);
                // Retry the original request with the new token
                const newRequest = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${res.token}`
                  }
                });
                this.snackBar.showError('Token expired');
                return next.handle(newRequest);
              } else {
                this.snackBar.showError('Token refresh failed');
                // Handle the token refresh failure
                return throwError(() => error);
              }
            }),
            catchError((refreshError: HttpErrorResponse) => {
              if (refreshError.status === 401 && refreshError.error === 'Refresh token expired') {
                alert('Hi')
                this.logout();
                this.snackBar.showError('Refresh token expired. Logging out.');
              }
              
              return throwError(() => error);
            })
          );
        } else if (error.status === 403) {
          // User Blocked
          localStorage.removeItem('userToken');
          this.router.navigate(['login']);
          this.snackBar.showError('User Blocked');
        }
        return throwError(() => error);
      })
    );
  }

  private logout() {
    // Add any additional logout logic here, such as clearing user information, navigating to the login page, etc.
    localStorage.removeItem('userToken');
    this.router.navigate(['login']);
  }
}

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
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router,private snackBar:SnackbarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          localStorage.removeItem('userToken');
          this.router.navigate(['login']);
          this.snackBar.showError('User Blocked')
        }
        return throwError(()=>error);
      })
    );
  }
}

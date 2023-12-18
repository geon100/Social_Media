import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, duration: number = 3000) {
    this.showSnackbar(message, 'success-snackbar', duration);
  }

  showError(message: string, duration: number = 3000) {
    this.showSnackbar(message, 'error-snackbar', duration);
  }

  private showSnackbar(message: string, panelClass: string, duration: number) {
    console.log(typeof panelClass)
    const config: MatSnackBarConfig = {
      panelClass: [panelClass,'mat-snack-bar'],
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      
    };
    this.snackBar.open(message, 'close', config);
  }
  
}

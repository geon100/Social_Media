
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';



const materialModules = [
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule
];

@NgModule({
  imports: [materialModules],
  exports: [materialModules],
})
export class MaterialModule {}

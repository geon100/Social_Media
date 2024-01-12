import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent {
  reportDetails:string=''
  constructor(public dialogRef: MatDialogRef<ReportModalComponent>) {}

  report(){
    if(this.reportDetails.trim()){
      this.dialogRef.close(this.reportDetails)
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

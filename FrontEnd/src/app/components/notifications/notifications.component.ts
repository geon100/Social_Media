import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{
  // notifications:any=[]
  constructor(private service:UserService,
    @Inject(MAT_DIALOG_DATA) public notifications:any,
    private dialogRef: MatDialogRef<NotificationsComponent>,
    private router:Router){}
  ngOnInit(): void {
    alert(this.notifications[0].sender)
  }

  closeModal(){
    this.dialogRef.close()
  }
  redirectUser(id:string){
    this.router.navigate(['/profile',id])
    this.dialogRef.close('none')
  }
}

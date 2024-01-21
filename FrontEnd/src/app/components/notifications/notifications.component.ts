import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { PostviewComponent } from 'src/app/views/postview/postview.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{
  // notifications:any=[]
  constructor(private service:UserService,
    @Inject(MAT_DIALOG_DATA) public notifications:any,private snack:SnackbarService,
    private dialogRef: MatDialogRef<NotificationsComponent>,
    private router:Router,private dialog: MatDialog){}
  ngOnInit(): void {
    
  }

  closeModal(){
    this.dialogRef.close()
  }
  redirectUser(id:string){
    this.router.navigate(['/profile',id])
    this.dialogRef.close('none')
  }

  redirectPost(post:any){
    this.dialog.open(PostviewComponent, {
      width: '49%',
      data: { post: post ,comment:false},
    });
  }

  accept(post:string){
    this.service.acceptCollab(post).subscribe()
    this.snack.showSuccess('Collaboration request Accepted')
    this.dialogRef.close('accept')
  }
  reject(post:string){
    this.service.rejectCollab(post).subscribe()
    this.snack.showSuccess('Collaboration request Rejected')
    this.dialogRef.close('reject')
  }
}

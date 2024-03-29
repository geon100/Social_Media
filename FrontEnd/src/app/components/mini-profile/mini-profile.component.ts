import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { getUser } from 'src/app/state/UserState/user.selector';
import { AddPostComponent } from '../add-post/add-post.component';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { NotificationsComponent } from '../notifications/notifications.component';
import { NotificationData } from 'src/app/models/all.interface';

@Component({
  selector: 'app-mini-profile',
  templateUrl: './mini-profile.component.html',
  styleUrls: ['./mini-profile.component.css']
})
export class MiniProfileComponent implements OnInit,OnDestroy{
   user!:User
   private userSubscription: Subscription | undefined;
   notification!:NotificationData[]
  constructor(private store:Store,private dialog:MatDialog,private service:UserService){}
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe()
  }

  ngOnInit(): void {
    this.userSubscription=this.store.select(getUser).subscribe((res)=>{

      if(res) this.user=res
    })
    this.service.loadNotifications().subscribe((res:NotificationData[])=>{

      if(res) this.notification=res
    })
  }
  openNotifications(){
    
    const dialogRef=this.dialog.open(NotificationsComponent, {
      data:this.notification
    });

    dialogRef.afterClosed().subscribe((res) => {
      if(res!=='none'){
      this.notification=this.notification.filter((val:NotificationData)=>val.type==='collab')
      if(res==='accept' || res==='reject')
      this.notification=[]
      this.service.readNotifications().subscribe()
      }
    });
}
  openAddPostDialog() {
    const dialogRef = this.dialog.open(AddPostComponent, {
      width: '400px',
    });

    
  }

}

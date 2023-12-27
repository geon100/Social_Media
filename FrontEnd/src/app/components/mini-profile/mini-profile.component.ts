import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { getUser } from 'src/app/state/UserState/user.selector';
import { AddPostComponent } from '../add-post/add-post.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mini-profile',
  templateUrl: './mini-profile.component.html',
  styleUrls: ['./mini-profile.component.css']
})
export class MiniProfileComponent implements OnInit,OnDestroy{
   user!:User
   private userSubscription: Subscription | undefined;

  constructor(private store:Store,private dialog:MatDialog){}
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe()
  }

  ngOnInit(): void {
    this.userSubscription=this.store.select(getUser).subscribe(res=>{
      console.log(res)
      if(res) this.user=res
    })
  }

  openAddPostDialog() {
    const dialogRef = this.dialog.open(AddPostComponent, {
      width: '400px', // Set the width as needed
    });

    
  }

}

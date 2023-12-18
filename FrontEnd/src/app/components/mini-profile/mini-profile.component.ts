import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { getUser } from 'src/app/state/UserState/user.selector';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-mini-profile',
  templateUrl: './mini-profile.component.html',
  styleUrls: ['./mini-profile.component.css']
})
export class MiniProfileComponent implements OnInit{
   user!:User
  constructor(private store:Store,private dialog:MatDialog){}

  ngOnInit(): void {
    this.store.select(getUser).subscribe(res=>{
      console.log(res)
      if(res) this.user=res
    })
  }

  openAddPostDialog() {
    const dialogRef = this.dialog.open(AddPostComponent, {
      width: '400px', // Set the width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result if needed
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usertaglist',
  templateUrl: './usertaglist.component.html',
  styleUrls: ['./usertaglist.component.css']
})
export class UsertaglistComponent implements OnInit{
  selectedUsers:any[]=[]
  followers:any[]=[]
  constructor(private dialogRef: MatDialogRef<UsertaglistComponent>,private service:UserService){}
  
  ngOnInit(): void {
    this.service.getFollowers().subscribe((res:any)=>{
      this.followers=res.followers
      
    })
  }
  closeModal(){
    this.dialogRef.close();
  }

  toggleUserSelection(user: any) {
    const userId = user._id;
    const index = this.selectedUsers.indexOf(userId);

    if (index === -1) {
      this.selectedUsers.push(userId);
    } else {
      this.selectedUsers.splice(index, 1);
    }
  }

  isSelected(user: any): boolean {
    
    return this.selectedUsers.includes(user._id);
  }
  selectUsers(){
    if(this.selectedUsers.length){
      console.log('modal',this.selectedUsers)
      this.dialogRef.close(this.selectedUsers)
    }else
    this.closeModal()
  }
}

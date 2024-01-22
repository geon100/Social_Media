import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserData } from 'src/app/models/all.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usertaglist',
  templateUrl: './usertaglist.component.html',
  styleUrls: ['./usertaglist.component.css']
})
export class UsertaglistComponent implements OnInit{
  selectedUsers:string[]=[]
  followers:UserData[]=[]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<UsertaglistComponent>,private service:UserService){}
  
  ngOnInit(): void {
    this.service.getFollowers().subscribe((res:{followers:UserData[]})=>{
      console.log('res.follow',res)
      this.followers=res.followers
      
    })
  }
  closeModal(){
    this.dialogRef.close();
  }

  toggleUserSelection(user: UserData) {
    const userId = user._id;
    const index = this.selectedUsers.indexOf(userId);

    if (index === -1) {
      this.selectedUsers.push(userId);
    } else {
      this.selectedUsers.splice(index, 1);
    }
  }

  isSelected(user: UserData): boolean {
    
    return this.selectedUsers.includes(user._id);
  }
  selectUsers(){
    if(this.selectedUsers.length){
      console.log('modal',this.selectedUsers)
      this.dialogRef.close(this.selectedUsers)
    }else
    this.closeModal()
  }

  sendCollabRequest(user: UserData){
    this.dialogRef.close(user)
  }
}

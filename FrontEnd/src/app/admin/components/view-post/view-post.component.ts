import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../service/admin.service';
import { Post } from 'src/app/models/all.interface';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private service:AdminService) {}
  block(id:string){
    
    this.service.changePostStatus(id).subscribe(()=>{
      this.data.post.isActive=!this.data.post.isActive
    })
  }
  blockUser(id:string){
    this.service.changeUserStatus(id).subscribe(()=>{
      this.data.report.reportedUser.isActive=!this.data.report.reportedUser.isActive
    })
  }
}

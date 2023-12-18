import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../service/admin.service';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
 
  constructor(private adminService: AdminService) {} 

  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['userName', 'profilePicture', 'fullName', 'followersCount', 'followingCount', 'blockAction'];

  ngOnInit() {
    this.adminService.getUsers().subscribe((users) => this.dataSource.data = users);
  }

  toggleBlockUser(user: any) { 
    console.log(user);

    this.adminService.changeUserStatus(user._id).subscribe(
      () => {
        console.log('User status changed successfully');
        const index = this.dataSource.data.findIndex(u => u._id === user._id);
        if (index !== -1) {
          this.dataSource.data[index].isActive = !this.dataSource.data[index].isActive;
          this.dataSource._updateChangeSubscription();
        }
      },
      (error) => {
        console.error('Error changing user status:', error);
      }
    );
  }
}

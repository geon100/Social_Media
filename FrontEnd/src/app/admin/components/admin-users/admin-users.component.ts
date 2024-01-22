import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../service/admin.service';
import { User } from 'src/app/models/user.interface';
import { MatPaginator } from '@angular/material/paginator';
import { UserData } from 'src/app/models/all.interface';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
 
  constructor(private adminService: AdminService) {} 

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['userName', 'profilePicture', 'fullName', 'followersCount', 'followingCount', 'blockAction'];

  ngOnInit() {
    this.adminService.getUsers().subscribe((users:UserData[]) => {
      this.dataSource.data = users
      this.dataSource.paginator=this.paginator
    });
  }

  toggleBlockUser(user: UserData) { 

    this.adminService.changeUserStatus(user._id).subscribe(
      () => {
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

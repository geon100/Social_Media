import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  constructor(private service:AdminService){}
  ngOnInit(): void {
    this.service.getUsers().subscribe(res=>{
      this.totalUsersCount=res.length
    })
    this.service.getPosts().subscribe(res=>{
      this.totalPostsCount=res.length
    })
  }
  totalUsersCount:number=10
  totalPostsCount:number=20
  
}

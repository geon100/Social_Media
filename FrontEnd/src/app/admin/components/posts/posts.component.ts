import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  constructor(private postService: AdminService) {}

  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['user', 'caption', 'image', 'commentsCount', 'likesCount'];

  ngOnInit() {
    this.postService.getPosts().subscribe((posts:any) => (this.dataSource.data = posts));
  }
}

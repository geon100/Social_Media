import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../service/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewPostComponent } from '../view-post/view-post.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  constructor(private adminService: AdminService,private dialog: MatDialog) {}

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['user', 'caption', 'image', 'commentsCount', 'likesCount','actions'];

  ngOnInit() {
    this.adminService.getPosts().subscribe((posts:any) => {
      this.dataSource.data = posts
      this.dataSource.paginator=this.paginator
    });
  }

  toggleBlock(id:string){
    alert(id)
    this.adminService.changePostStatus(id).subscribe(
      () => {
        const index = this.dataSource.data.findIndex(u => u._id === id);
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

  // viewPost(id:string){} 

  viewPost(post: any): void {
    this.dialog.open(ViewPostComponent, {
      width: '49%', 
      data: { post: post }
    });
  
  }
}

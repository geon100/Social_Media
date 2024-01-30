import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { PostService } from 'src/app/services/post.service';
import { getUser } from 'src/app/state/UserState/user.selector';
import { PostviewComponent } from 'src/app/views/postview/postview.component';
import { SharelistComponent } from '../sharelist/sharelist.component';
import { ReportModalComponent } from '../report-modal/report-modal.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Post } from 'src/app/models/all.interface';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @Input()
  post!: Post;
  liked!:boolean
  save!:boolean
  current!:boolean
  @Input() comment:boolean=true
  constructor(private store:Store,private service:PostService,private dialog: MatDialog,private snackBar:SnackbarService){}

  ngOnInit(): void {
    
    this.store.select(getUser).subscribe(res=>{
      if(res) {
        this.liked=this.post.likes.includes(res?._id)
        this.current=this.post.user.userName===res.userName
        this.save=res.saved.includes(this.post._id)
        
      }
    })
    
  }
  reportPost(id:string){
  
    const dialogRef = this.dialog.open(ReportModalComponent, {
      width: '500px', 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const report={
          postId:id,
          reportText:result,
          type:'post'
        }
        this.service.reportPost(report).subscribe(()=>{
          this.snackBar.showSuccess('Post Reported')
        })
      }
    });
  
   }
   openPostModal() {
    this.dialog.open(PostviewComponent, {
      width: '49%',
      data: { post: this.post ,comment:false},
    });
    
  }

  sharelistModal(post:string){
    this.dialog.open(SharelistComponent, {
      data: post ,
    });
  }
    
  savePost(){
    this.service.savePosts(this.post._id).subscribe(()=>{
      this.save=!this.save
      if(this.save) this.snackBar.showSuccess('Post Saved')
    })
  }

  toggleLike(){
    this.service.togglelike(this.post._id).subscribe((res:Post)=>{
      
      this.post.likes=res.likes
      this.liked=!this.liked
    })
  }
}

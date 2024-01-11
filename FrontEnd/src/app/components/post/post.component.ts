import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { PostService } from 'src/app/services/post.service';
import { getUser } from 'src/app/state/UserState/user.selector';
import { PostviewComponent } from 'src/app/views/postview/postview.component';
import { SharelistComponent } from '../sharelist/sharelist.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @Input() post: any;
  liked!:boolean
  save!:boolean
  current!:boolean
  @Input() comment:boolean=true
  constructor(private store:Store,private service:PostService,private dialog: MatDialog){}

  ngOnInit(): void {
    this.store.select(getUser).subscribe(res=>{
      if(res) {
        this.liked=this.post.likes.includes(res?._id)
        this.current=this.post.user.userName===res.userName
        this.save=res.saved.includes(this.post._id)
      }
    })
    
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
    this.service.savePosts(this.post._id).subscribe((res:any)=>{
      this.save=!this.save
    })
  }

  toggleLike(){
    this.service.togglelike(this.post._id).subscribe((res:any)=>{
      
      this.post.likes=res.likes
      this.liked=!this.liked
    })
  }
}
